package com.example.HomePS.service;

import com.example.HomePS.model.Daily_TurnOver;
import com.example.HomePS.repository.DailyTurnOverRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class Statistical {

    private final DailyTurnOverRepository dailyTurnOverRepository;

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