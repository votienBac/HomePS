package com.example.HomePS.dto;

import com.example.HomePS.model.Event;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class EventResponse {
    public int currentPage;
    public int totalPage;
    public List<Event> eventList;
}