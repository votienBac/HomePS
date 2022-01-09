package com.example.HomePS.dto;

import com.example.HomePS.model.ExtraService;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ServiceResponse {

    public int currentPage;
    public int totalPage;
    public List<ExtraService> serviceList;
}
