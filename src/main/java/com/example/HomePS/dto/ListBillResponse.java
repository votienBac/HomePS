package com.example.HomePS.dto;

import com.example.HomePS.model.Bill;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BillResponse {
    public int currentPlaying;
    public int currentPage;
    public int totalPage;
    public List<Bill> currentTurns;
}