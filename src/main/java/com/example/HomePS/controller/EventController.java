package com.example.HomePS.controller;

import com.example.HomePS.model.Event;
import com.example.HomePS.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public void createNewEvent(@RequestBody Event event){
        eventService.save(event);
    }

    @GetMapping
    public Iterable<Event> getEventsByPage(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "eventId") String sortBy
    ){
        return eventService.getEventsByPage(page - 1, size, sortBy);
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id){
        return eventService.getEvent(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        eventService.delete(id);
    }

    @GetMapping("/search/{query}")
    public List<Event> searchEventByName(@PathVariable String query) {
        return eventService.searchEventByName(query);
    }
}
