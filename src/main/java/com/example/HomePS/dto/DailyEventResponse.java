package com.example.HomePS.dto;

import com.example.HomePS.model.DailyEvent;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DailyEventResponse {

    public int currentPage;
    public int totalPage;
    public List<DailyEvent> dailyEventList;
}
