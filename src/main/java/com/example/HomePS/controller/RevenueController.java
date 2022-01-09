package com.example.HomePS.controller;

import com.example.HomePS.dto.StatisticResponse;
import com.example.HomePS.model.Daily_TurnOver;
import com.example.HomePS.model.MonthRevenue;
import com.example.HomePS.service.Statistical;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/revenue")
public class RevenueController {

    private Statistical statistical;

    @GetMapping
    public ResponseEntity<StatisticResponse> getRevenue(
            @RequestParam(required = false, defaultValue = "full") String status,
            @RequestParam(required = false, defaultValue = "1970/01/01") String dateBegin,
            @RequestParam(required = false, defaultValue = "") String dateEnd
    ) {
        LocalDate end = LocalDate.now();
        List<Daily_TurnOver> revenueList;
        switch (status) {
            case "7 days":
                revenueList = statistical.getRevenueDay(end.minusDays(8), end.minusDays(1));
                break;
            case "30 days":
                revenueList = statistical.getRevenueDay(end.minusDays(31), end.minusDays(1));
                break;
            default:
                LocalDate dateBegin2 = LocalDate.parse(dateBegin, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
                if (dateEnd.equals("")) {
                    revenueList = statistical.getRevenueDay(dateBegin2, end);
                } else {
                    LocalDate dateEnd2 = LocalDate.parse(dateEnd, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
                    revenueList = statistical.getRevenueDay(dateBegin2, dateEnd2);
                }
        }
        return ResponseEntity.ok(new StatisticResponse(revenueList, statistical.getSumTurnOver(revenueList)));
    }

    @GetMapping("/months")
    public List<MonthRevenue> monthRevenue(@RequestParam(required = false, defaultValue = "1970-01") String monthBegin,
                                           @RequestParam(required = false, defaultValue = "") String monthEnd){
        monthBegin=monthBegin+"-01";
        LocalDate timeBegin=LocalDate.parse(monthBegin, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate timeEnd;
        if(monthEnd.equals("")){
            timeEnd=LocalDate.now();
        }else{
            monthEnd=monthEnd+"-01";
            timeEnd=LocalDate.parse(monthEnd, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        }
        int numberMonths;
        if(timeEnd.getYear()-timeBegin.getYear()>=1){

            numberMonths=-timeBegin.getMonthValue()+12+1+(timeEnd.getYear()-timeBegin.getYear()-1)*12+timeEnd.getMonthValue();
        }else{
            numberMonths=timeEnd.getMonthValue()-timeBegin.getMonthValue()+1;
        }
        boolean check=false;
        List<MonthRevenue> listMonthRevenue=new ArrayList<>();
        for(int i=0;i<numberMonths;i++){
            double revenueMonth=statistical.getSumTurnOver(statistical.getRevenueDay(timeBegin,timeBegin.plusDays(-1+timeBegin.lengthOfMonth())));
            if(revenueMonth>0) {
                check=true;

            }
            if(check){
                MonthRevenue monthRevenue=new MonthRevenue(timeBegin.getYear()+"-"+timeBegin.getMonthValue(),revenueMonth);
                listMonthRevenue.add(monthRevenue);
            }
            timeBegin=timeBegin.plusDays(timeBegin.lengthOfMonth());

        }
        return listMonthRevenue;
    }

}