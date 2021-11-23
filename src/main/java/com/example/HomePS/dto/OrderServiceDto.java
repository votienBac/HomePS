package com.example.HomePS.dto;

import com.example.HomePS.model.ExtraService;
import lombok.Data;

@Data
public class OrderServiceDto {
    private ExtraService extraService;
    private Integer quantity;
}
