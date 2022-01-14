package com.example.HomePS.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ListBillResponse {
    public int currentPlaying;
    public int currentPage;
    public int totalPage;
    public List<BillResponse> currentTurns;
}