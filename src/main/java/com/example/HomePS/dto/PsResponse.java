package com.example.HomePS.dto;

import com.example.HomePS.model.PlayStation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PsResponse {
    public int currentPage;
    public int totalPage;
    public List<PlayStation> psList;
}