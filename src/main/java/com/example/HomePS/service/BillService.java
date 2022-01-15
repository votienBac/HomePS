package com.example.HomePS.service;

import com.example.HomePS.dto.BillRequest;
import com.example.HomePS.model.*;
import com.example.HomePS.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.*;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class BillService {
    private static final int PricePerHour = 30000;
    private final BillRepository billRepository;
    private final PSRepository psRepository;
    private final EventRepository eventRepository;
    private final DailyEventRepository dailyEventRepository;
    private final DailyTurnOverRepository dailyTurnOverRepository;

    public List<Bill> findAll() {
        return billRepository.findAll();
    }

    public List<Bill> findPaidBill() {
        return billRepository.findAllByTimeEndIsNotNull();
    }

    public List<Bill> findUnpaidBill() {
        return billRepository.findAllByTimeEndIsNull();
    }

    public List<Bill> getBillsByPage(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        Page<Bill> result = billRepository.findAll(pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<Bill> getPaidBillsByPage(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        Page<Bill> result = billRepository.findAllByTimeEndIsNotNull(pageable);

        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<Bill> getUnpaidBillByPage(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        Page<Bill> result = billRepository.findAllByTimeEndIsNull(pageable);

        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<Bill> searchBillByPs(String query) {
        return billRepository.searchBill(query);
    }

    public List<Bill> searchBillByPs(String query, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        Page<Bill> result = billRepository.searchBill(query, pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<Bill> searchPaidByPS(String query) {
        return billRepository.searchPaidBill(query);
    }

    public List<Bill> searchPaidByPS(String query, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        Page<Bill> result = billRepository.searchPaidBill(query, pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<Bill> searchUnpaidByPS(String query) {
        return billRepository.searchUnpaidBill(query);
    }

    public List<Bill> searchUnpaidByPS(String query, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        Page<Bill> result = billRepository.searchUnpaidBill(query, pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }


    public Bill getBill(Long id) {
        return billRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bill not found with this ID"));
    }

    public Bill create(BillRequest billRequest) {
        Bill bill = new Bill();
        Long psId = billRequest.getPsId();
        PlayStation ps = psRepository
                .findById(psId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "PS not found!"));
        if (ps.getPsStatus() != PlayStation.FREE)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This PlayStation is in use.");
        ps.setPsStatus(PlayStation.BUSY);
        bill.setPlayStation(ps);
        bill.setTimeStart(Instant.now());
        bill.setPaid(false);
        return billRepository.save(bill);
    }

    public Bill endBill(Long id) {
        Bill bill = getBill(id);
        PlayStation ps = bill.getPlayStation();
        ps.setPsStatus(PlayStation.FREE);
        bill.setTimeEnd(Instant.now());
        bill.setPaid(true);
        findEventForBill(bill);
        findDailyEventForBill(bill);
        bill.setTotalPrice(getTotalBillPrice(bill));
        bill.setTotalHourPlayed(getTotalHourPlayed(bill));
        addBill_OneDay(bill);
        return billRepository.save(bill);
    }

    public Bill update(Bill bill) {
        Bill oldBill = getBill(bill.getBillId());
        ZonedDateTime zonedDateTime1 = oldBill.getTimeStart().atZone(ZoneId.systemDefault());
        LocalDate oldDate = LocalDate.of(zonedDateTime1.getYear(), zonedDateTime1.getMonth(), zonedDateTime1.getDayOfMonth());
        Daily_TurnOver daily_turnOverBefore = dailyTurnOverRepository.findDaily_TurnOverByDate(oldDate);
        if (oldBill.getTotalPrice() != null) {
            daily_turnOverBefore.setTurnOver(daily_turnOverBefore.getTurnOver() - oldBill.getTotalPrice());
            dailyTurnOverRepository.save(daily_turnOverBefore);
            addBill_OneDay(bill);
        }
        return billRepository.save(bill);
    }

    public void addBill_OneDay(Bill bill) {
        ZonedDateTime zonedDateTime = bill.getTimeStart().atZone(ZoneId.systemDefault());
        LocalDate date = LocalDate.of(zonedDateTime.getYear(), zonedDateTime.getMonth(), zonedDateTime.getDayOfMonth());
        if (dailyTurnOverRepository.findDaily_TurnOverByDate(date) == null) {
            Daily_TurnOver lastDaily_TurnOver = dailyTurnOverRepository.findTopByOrderByDateDesc();
            Daily_TurnOver daily_turnOver = new Daily_TurnOver(date, bill.getTotalPrice());
            LocalDate lastDate = lastDaily_TurnOver.getDate();

            long days = Duration.between(lastDaily_TurnOver.getDate().atStartOfDay(), daily_turnOver.getDate().atStartOfDay()).toDays();
            if (days > 0) {
                for (long i = 0; i < days; i++) {
                    Daily_TurnOver turnOver = new Daily_TurnOver(lastDate.plusDays(1), 0.0);
                    lastDate = lastDate.plusDays(1);
                    dailyTurnOverRepository.save(turnOver);
                }
            }
            dailyTurnOverRepository.save(daily_turnOver);
        } else {
            Daily_TurnOver daily_turnOver = dailyTurnOverRepository.findDaily_TurnOverByDate(date);
            daily_turnOver.setTurnOver(daily_turnOver.getTurnOver() + bill.getTotalPrice());
            dailyTurnOverRepository.save(daily_turnOver);
        }

    }

    public Double getTotalHourPlayed(Bill bill) {
        Duration duration = Duration.between(bill.getTimeStart(), bill.getTimeEnd());
        long totalMinutes = duration.toMinutes(); //tong so phut choi
        return ((totalMinutes % 60) > 30) ? (totalMinutes / 60 + 1) : (totalMinutes / 60 + 0.5);
    }


    public Double getTotalBillPrice(Bill bill) {
        double sum = 0;
        if (bill.getEvent() != null && bill.getDailyEvent() != null) {
            if (bill.getEvent().isDeleted() && bill.getDailyEvent().isDeleted()) {
                sum = getTotalHourPlayed(bill) * PricePerHour;
            } else if (bill.getDailyEvent().isDeleted()) {
                sum = getTotalHourPlayed(bill) * PricePerHour * (100f - bill.getEvent().getPercentDiscount()) / 100f;
            } else if (bill.getEvent().isDeleted()) {
                sum = getTotalHourPlayed(bill) * PricePerHour * (100f - bill.getDailyEvent().getPercentDiscount()) / 100f;
            } else {
                double maxDiscount = Math.max(bill.getEvent().getPercentDiscount(), bill.getDailyEvent().getPercentDiscount());
                sum = getTotalHourPlayed(bill) * PricePerHour * (100f - maxDiscount) / 100f;
            }
        } else if (bill.getEvent() != null && !bill.getEvent().isDeleted()) {
            sum = getTotalHourPlayed(bill) * PricePerHour * (100f - bill.getEvent().getPercentDiscount()) / 100f;
        } else if (bill.getDailyEvent() != null && !bill.getDailyEvent().isDeleted()) {
            sum = getTotalHourPlayed(bill) * PricePerHour * (100f - bill.getDailyEvent().getPercentDiscount()) / 100f;
        } else {
            sum = getTotalHourPlayed(bill) * PricePerHour;
        }
        if (bill.getOrderServices() != null) {
            List<OrderService> orderServices = bill.getOrderServices();
            for (OrderService os : orderServices) {
                sum += os.getTotalPrice();
            }
        }
        return sum;
    }

    public void findEventForBill(Bill bill) {
        if (!eventRepository.findAll().isEmpty()) {
            List<Event> events = eventRepository.findAll();
            double maxDiscount = 0;
            for (Event event : events) {
                if (!event.isDeleted() && bill.getTimeStart().isAfter(event.getTimeStart()) && bill.getTimeEnd().isBefore(event.getTimeEnd())) {
                    if (event.getPercentDiscount() > maxDiscount) {
                        maxDiscount = event.getPercentDiscount();
                        bill.setEvent(event);
                    }
                }
            }
        }
    }

    public void findDailyEventForBill(Bill bill) {
        if (!dailyEventRepository.findAll().isEmpty()) {
            List<DailyEvent> dailyEvents = dailyEventRepository.findAll();
            double maxDiscount = 0;
            for (DailyEvent dailyEvent : dailyEvents) {
                if (!dailyEvent.isDeleted() && check(dailyEvent.getDayHappen(), convertToString(bill)) &&
                        LocalTime.ofInstant(bill.getTimeStart(), ZoneId.of("GMT+7")).isAfter(dailyEvent.getTimeStart()) &&
                        LocalTime.ofInstant(bill.getTimeStart(), ZoneId.of("GMT+7")).isBefore(dailyEvent.getTimeEnd())) {
                    if (dailyEvent.getPercentDiscount() > maxDiscount) {
                        maxDiscount = dailyEvent.getPercentDiscount();
                        bill.setDailyEvent(dailyEvent);
                    }
                }
            }
        }
    }

    private boolean check(String timeStartOfBill, String dayHappen) {
        for (int i = 0; i < 7; i++) {
            if (timeStartOfBill.charAt(i) == '1' && dayHappen.charAt(i) == '1') {
                return true;
            }
        }
        return false;
    }

    private String convertToString(Bill bill) {
        var day = bill.getTimeStart().atZone(ZoneId.of("Asia/Ho_Chi_Minh")).getDayOfWeek();
        switch (day) {
            case MONDAY:
                return "1000000";
            case TUESDAY:
                return "0100000";
            case WEDNESDAY:
                return "0010000";
            case THURSDAY:
                return "0001000";
            case FRIDAY:
                return "0000100";
            case SATURDAY:
                return "0000010";
            case SUNDAY:
                return "0000001";

        }
        return null;
    }

    public void deleteBill(Bill bill) {
        if (!bill.isPaid()) bill.getPlayStation().setPsStatus(0);

        ZonedDateTime zonedDateTime1 = bill.getTimeStart().atZone(ZoneId.systemDefault());
        LocalDate date = LocalDate.of(zonedDateTime1.getYear(), zonedDateTime1.getMonth(), zonedDateTime1.getDayOfMonth());
        Daily_TurnOver daily_turnOverBefore = dailyTurnOverRepository.findDaily_TurnOverByDate(date);
        if (bill.getTotalPrice() != null) {
            daily_turnOverBefore.setTurnOver(daily_turnOverBefore.getTurnOver() - bill.getTotalPrice());
            dailyTurnOverRepository.save(daily_turnOverBefore);
        }

        billRepository.delete(bill);
    }

}
