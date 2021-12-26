package com.example.HomePS.dto;

import com.example.HomePS.model.Daily_TurnOver;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class StatisticResponse {
    public List<Daily_TurnOver> revenueList;
    public double revenue;
}
