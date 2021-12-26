package com.example.HomePS.service;

import com.example.HomePS.model.Bill;
import com.example.HomePS.model.Daily_TurnOver;
import com.example.HomePS.repository.BillRepository;
import com.example.HomePS.repository.DailyTurnOverRepository;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class Statistical {

    private final DailyTurnOverRepository dailyTurnOverRepository;
    //    private final BillRepository billRepository;
//    public Iterable<Bill> getBillFromTime(String timeBegin, String timeEnd){
//        List<Bill> listBill=new ArrayList<>();
//        if(timeBegin==""){
//            if(timeEnd==""){
//                listBill=billRepository.findAll();
//            }else{
//                Instant ins=Instant.parse(timeEnd+t);
//                Instant insEnd=ins.plus(1, ChronoUnit.DAYS);
//                listBill=billRepository.findAllByTimeStartBefore(insEnd);
//            }
//        }else{
//            if(timeEnd==""){
//                Instant ins=Instant.parse(timeBegin+t);
//                listBill=billRepository.findAllByTimeStartAfter(ins);
//            }else{
//                Instant insBegin=Instant.parse(timeBegin+t);
//                Instant ins=Instant.parse(timeEnd+t);
//                Instant insEnd=ins.plus(1, ChronoUnit.DAYS);
//                listBill=billRepository.findAllByTimeStartBetween(insBegin,insEnd);
//            }
//        }
//        return listBill;
//    }
    public List<Daily_TurnOver> getRevenueDay(LocalDate dateBegin, LocalDate dateEnd) {
        List<Daily_TurnOver> list_Daily_TurnOver=dailyTurnOverRepository.findDaily_TurnOverByDateBetween(dateBegin, dateEnd);
        if(list_Daily_TurnOver.size()<=0){
            return List.of();
        }
        return list_Daily_TurnOver;
    }

    public double getSumTurnOver(List<Daily_TurnOver> list){
        double sumTurnOver=0;
        for (Daily_TurnOver daily_turnOver : list) {
            sumTurnOver += daily_turnOver.getTurnOver();
        }
        return sumTurnOver;
    }


}