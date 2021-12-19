package com.example.HomePS.controller;

import com.example.HomePS.model.Daily_TurnOver;
import com.example.HomePS.service.Statistical;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@AllArgsConstructor
@RequestMapping("api/Renevue")
public class RenevueController {

    private Statistical statistical;

    @GetMapping
    public double getRenevue(
            @RequestParam(required = false, defaultValue = "full") String status,
            @RequestParam(required = false, defaultValue = "1970/01/01")String dateBegin,
            @RequestParam(required = false, defaultValue = "")String dateEnd
    ){
        LocalDate end=LocalDate.now();
        switch (status){


            case "7 days":

                return  statistical.getSumTurnOver(statistical.getRenevueDay(end.minusDays(8), end.minusDays(1)));
            case "30 days":

                return statistical.getSumTurnOver(statistical.getRenevueDay(end.minusDays(31), end.minusDays(1)));
            default:
                    LocalDate dateBegin2=LocalDate.parse(dateBegin, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
                    if(dateEnd.equals("")){

                        return statistical.getSumTurnOver(statistical.getRenevueDay(dateBegin2,end));
                    }else{
                        LocalDate dateEnd2=LocalDate.parse(dateEnd,DateTimeFormatter.ofPattern("yyyy/MM/dd"));
                        return statistical.getSumTurnOver(statistical.getRenevueDay(dateBegin2,dateEnd2));
                    }



        }

    }
}
