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

    public Iterable<Bill> getBillsByPage(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Bill> result = billRepository.findAll(pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public Iterable<Bill> getPaidBillsByPage(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Bill> result = billRepository.findAllByTimeEndIsNotNull(pageable);

        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public Iterable<Bill> getUnpaidBillByPage(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Bill> result = billRepository.findAllByTimeEndIsNull(pageable);

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
            Daily_TurnOver lastDaily_TurnOver=dailyTurnOverRepository.findTopByOrderByDateDesc();
            Daily_TurnOver daily_turnOver = new Daily_TurnOver(date, bill.getTotalPrice());
            LocalDate lastDate=lastDaily_TurnOver.getDate();

            long days= Duration.between( lastDaily_TurnOver.getDate().atStartOfDay(),daily_turnOver.getDate().atStartOfDay()).toDays();
            if(days>0) {
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
        Long totalMinutes = duration.toMinutes(); //tong so phut choi
        Double totalHours = ((totalMinutes % 60) > 30) ? (totalMinutes / 60 + 1) : (totalMinutes / 60 + 0.5);
        return totalHours;
    }

    public Double getTotalBillPrice(Bill bill) {
        double sum = 0;
        if (bill.getEvent() != null) {
            sum = getTotalHourPlayed(bill) * PricePerHour * (1 - bill.getEvent().getPercentDiscount());
        } else if (bill.getDailyEvent() != null) {
            sum = getTotalHourPlayed(bill) * PricePerHour * (1 - bill.getDailyEvent().getPercentDiscount());

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
            for (Event event : events) {
                if (bill.getTimeStart().isAfter(event.getTimeStart()) && bill.getTimeEnd().isBefore(event.getTimeEnd())) {
                    bill.setEvent(event);
                }
            }
        }
    }

    public void findDailyEventForBill(Bill bill) {
        if (!dailyEventRepository.findAll().isEmpty()) {
            List<DailyEvent> dailyEvents = dailyEventRepository.findAll();
            for (DailyEvent dailyEvent : dailyEvents) {
                dailyEvent.setTimeAgain();
                if (bill.getTimeStart().isAfter(dailyEvent.getTimeStart()) && bill.getTimeEnd().isBefore(dailyEvent.getTimeEnd())) {
                    bill.setDailyEvent(dailyEvent);
                }
                dailyEventRepository.save(dailyEvent);
            }
        }
    }

    public void deleteBill(Bill bill) {
        if (!bill.isPaid()) bill.getPlayStation().setPsStatus(0);
        billRepository.delete(bill);
    }

    public List<Bill> searchByPS(String query) {
        return billRepository.search(query);
    }

}
