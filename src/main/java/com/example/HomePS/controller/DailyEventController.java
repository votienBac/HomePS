package com.example.HomePS.controller;

import com.example.HomePS.model.DailyEvent;
import com.example.HomePS.model.Event;
import com.example.HomePS.service.DailyEventService;
import com.example.HomePS.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dailyEvents")
@AllArgsConstructor
public class DailyEventController {
    private final DailyEventService dailyEventService;

    @PostMapping
    public void createNewDailyEvent(@RequestBody DailyEvent dailyEvent){
        dailyEventService.save(dailyEvent);
    }

    @GetMapping
    public Iterable<DailyEvent> getDailyEventsByPage(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "dailyEventId") String sortBy
    ){
        return dailyEventService.getDailyEventsByPage(page - 1, size, sortBy);
    }

    @GetMapping("/{id}")
    public DailyEvent getDailyEvent(@PathVariable Long id){
        return dailyEventService.getDailyEvent(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        dailyEventService.delete(id);
    }
}
