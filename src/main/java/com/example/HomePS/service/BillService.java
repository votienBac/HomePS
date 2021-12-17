package com.example.HomePS.service;

import com.example.HomePS.dto.BillRequest;
import com.example.HomePS.model.*;
import com.example.HomePS.repository.BillRepository;
import com.example.HomePS.repository.DailyEventRepository;
import com.example.HomePS.repository.EventRepository;
import com.example.HomePS.repository.PSRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.Instant;
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

    public Iterable<Bill> getBillsByPage(Integer pageNumber, Integer pageSize, String sortBy){
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

    public Bill getBill(Long id){
        return billRepository.getById(id);
    }

    public Bill create(BillRequest billRequest){
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

    public Bill endBill(Long id){
        Bill bill = billRepository.getById(id);
        PlayStation ps = bill.getPlayStation();
        ps.setPsStatus(PlayStation.FREE);
        bill.setTimeEnd(Instant.now());
        bill.setPaid(true);
        findEventForBill(bill);
        findDailyEventForBill(bill);
        bill.setTotalPrice(getTotalBillPrice(bill));
        bill.setTotalHourPlayed(getTotalHourPlayed(bill));
        return billRepository.save(bill);
    }

    public Bill update(Bill bill){
        return billRepository.save(bill);
    }

    public Double getTotalHourPlayed(Bill bill){
        Duration duration = Duration.between(bill.getTimeStart(), bill.getTimeEnd());
        Long totalMinutes = duration.toMinutes(); //tong so phut choi
        Double totalHours = ((totalMinutes%60)>30)?(totalMinutes/60 + 1):(totalMinutes/60 + 0.5);
        return totalHours;
    }

    public Double getTotalBillPrice(Bill bill){
        double sum = 0;
        if(bill.getEvent() != null){
            sum = getTotalHourPlayed(bill)*PricePerHour*(1-bill.getEvent().getPercentDiscount());
        }
        else if(bill.getDailyEvent() != null) {
            sum = getTotalHourPlayed(bill) * PricePerHour * (1-bill.getDailyEvent().getPercentDiscount());

        }else{
            sum = getTotalHourPlayed(bill)*PricePerHour;
        }
        if(bill.getOrderServices() != null){
            List<OrderService> orderServices = bill.getOrderServices();
            for(OrderService os: orderServices){
                sum+=os.getTotalPrice();
            }
        }
        return sum;
    }

    public void findEventForBill(Bill bill){
        if(!eventRepository.findAll().isEmpty()){
            List<Event> events = eventRepository.findAll();
            for(Event event: events){
                if(bill.getTimeStart().isAfter(event.getTimeStart()) && bill.getTimeEnd().isBefore(event.getTimeEnd())){
                    bill.setEvent(event);
                }
            }
        }
    }
    public void findDailyEventForBill(Bill bill){
        if(!dailyEventRepository.findAll().isEmpty()){
            List<DailyEvent> dailyEvents = dailyEventRepository.findAll();
            for(DailyEvent dailyEvent: dailyEvents){
                dailyEvent.setTimeAgain();
                if(bill.getTimeStart().isAfter(dailyEvent.getTimeStart()) && bill.getTimeEnd().isBefore(dailyEvent.getTimeEnd())){
                    bill.setDailyEvent(dailyEvent);
                }
                dailyEventRepository.save(dailyEvent);
            }
        }
    }

}
