package com.example.HomePS.dto;

import com.example.HomePS.model.Event;
import com.example.HomePS.model.OrderService;
import com.example.HomePS.model.PlayStation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class BillResponse {
    private Long billId;
    private Instant timeStart;
    private Instant timeEnd;
    private boolean isPaid;
    private PlayStation playStation;
    private List<OrderService> orderServices;
    private Event event;
    private Double totalHourPlayed;
    private Double totalPrice;
}