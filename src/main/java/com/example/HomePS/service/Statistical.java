package com.example.HomePS.service;

import com.example.HomePS.model.Bill;
import com.example.HomePS.model.Daily_TurnOver;
import com.example.HomePS.repository.BillRepository;
import com.example.HomePS.repository.DailyTurnOverRepository;
import io.swagger.models.auth.In;
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

    public List<Daily_TurnOver> getRenevueDay(LocalDate dateBegin, LocalDate dateEnd) {


        List<Daily_TurnOver> list_Daily_TurnOver=dailyTurnOverRepository.findDaily_TurnOverByDateBetween(dateBegin, dateEnd);



        if(list_Daily_TurnOver.size()<=0){

            return List.of();
        }

        return list_Daily_TurnOver;

    }



    public double getSumTurnOver(List<Daily_TurnOver> list){
        double sumTurnOver=0;
        for(int i=0;i<list.size();i++){
            sumTurnOver+=list.get(i).getTurnOver();
        }
        return sumTurnOver;
    }


}