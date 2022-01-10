package com.example.HomePS.controller;

import com.example.HomePS.dto.DailyEventResponse;
import com.example.HomePS.model.DailyEvent;
import com.example.HomePS.service.DailyEventService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dailyEvents")
@AllArgsConstructor
public class DailyEventController {
    private final DailyEventService dailyEventService;

    @PostMapping
    public DailyEvent createNewDailyEvent(@RequestBody DailyEvent dailyEvent){
        return dailyEventService.save(dailyEvent);
    }

    @GetMapping
    public DailyEventResponse getDailyEventsByPage(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "dailyEventId") String sortBy
    ){
        int totalPage = (int) Math.ceil(dailyEventService.getAllDailyEvents().size() * 1.0 / size);
        List<DailyEvent> dailyEventList = dailyEventService.getDailyEventsByPage(page - 1, size, sortBy);
        return new DailyEventResponse(page, totalPage, dailyEventList);
    }

    @GetMapping("/search")
    public DailyEventResponse searchEventByName(
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "eventId") String sortBy
    ) {
        if (query.equals("")) {
            int totalPage = (int) Math.ceil(dailyEventService.getAllDailyEvents().size() * 1.0 / size);
            List<DailyEvent> eventList = dailyEventService.getDailyEventsByPage(page - 1, size, sortBy);
            return new DailyEventResponse(page, totalPage, eventList);
        }
        int totalPage = (int) Math.ceil(dailyEventService.searchEventByName(query).size() * 1.0 / size);
        List<DailyEvent> eventList = dailyEventService.searchEventByName(query, page - 1, size, sortBy);
        return new DailyEventResponse(page, totalPage, eventList);
    }

    @GetMapping("/{id}")
    public DailyEvent getDailyEvent(@PathVariable Long id){
        return dailyEventService.getDailyEvent(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        dailyEventService.delete(id);
    }

    @PutMapping("/{id}")
    public DailyEvent updateEvent(@PathVariable Long id, @RequestBody DailyEvent event) {
        return dailyEventService.update(id, event);
    }
}
