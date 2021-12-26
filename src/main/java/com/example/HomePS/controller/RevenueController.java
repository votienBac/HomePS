package com.example.HomePS.controller;

import com.example.HomePS.dto.StatisticResponse;
import com.example.HomePS.model.Daily_TurnOver;
import com.example.HomePS.service.Statistical;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
            case "30 days":
                revenueList = statistical.getRevenueDay(end.minusDays(31), end.minusDays(1));
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
}
