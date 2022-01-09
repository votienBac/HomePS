package com.example.HomePS.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class MonthRevenue {
    private String month;
    private Double revenue;

}
