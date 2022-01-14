package com.example.HomePS.mapper;

import com.example.HomePS.dto.BillResponse;
import com.example.HomePS.model.Bill;
import com.example.HomePS.model.DailyEvent;
import com.example.HomePS.model.Event;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

public class ApiMapper {

    public static Event mapDailyEventToEvent(DailyEvent dailyEvent) {
        if (dailyEvent == null) return null;
        return new Event(
                dailyEvent.getDailyEventId(),
                dailyEvent.getDailyEventName(),
                dailyEvent.getTimeStart().atDate(LocalDate.now()).atZone(ZoneId.of("GMT+0")).toInstant(),
                dailyEvent.getTimeEnd().atDate(LocalDate.now()).atZone(ZoneId.of("GMT+0")).toInstant(),
                dailyEvent.getPercentDiscount(),
                true
        );
    }

    public static List<BillResponse> mapListBillToListBillResponse(List<Bill> source) {
        return source.stream().map(ApiMapper::mapBillToResponse).collect(Collectors.toList());
    }

    public static BillResponse mapBillToResponse(Bill bill) {
        if (bill.getEvent() == null) {
            return new BillResponse(
                    bill.getBillId(),
                    bill.getTimeStart(),
                    bill.getTimeEnd(),
                    bill.isPaid(),
                    bill.getPlayStation(),
                    bill.getOrderServices(),
                    mapDailyEventToEvent(bill.getDailyEvent()),
                    bill.getTotalHourPlayed(),
                    bill.getTotalPrice()
            );
        }

        if (bill.getDailyEvent() == null) {
            return new BillResponse(
                    bill.getBillId(),
                    bill.getTimeStart(),
                    bill.getTimeEnd(),
                    bill.isPaid(),
                    bill.getPlayStation(),
                    bill.getOrderServices(),
                    bill.getEvent(),
                    bill.getTotalHourPlayed(),
                    bill.getTotalPrice()
            );
        }

        if (bill.getEvent().getPercentDiscount() >= bill.getDailyEvent().getPercentDiscount())
            return new BillResponse(
                    bill.getBillId(),
                    bill.getTimeStart(),
                    bill.getTimeEnd(),
                    bill.isPaid(),
                    bill.getPlayStation(),
                    bill.getOrderServices(),
                    bill.getEvent(),
                    bill.getTotalHourPlayed(),
                    bill.getTotalPrice()
            );
        else {
            return new BillResponse(
                    bill.getBillId(),
                    bill.getTimeStart(),
                    bill.getTimeEnd(),
                    bill.isPaid(),
                    bill.getPlayStation(),
                    bill.getOrderServices(),
                    mapDailyEventToEvent(bill.getDailyEvent()),
                    bill.getTotalHourPlayed(),
                    bill.getTotalPrice()
            );
        }
    }
}
