package com.example.HomePS.controller;

import com.example.HomePS.dto.EventResponse;
import com.example.HomePS.model.Event;
import com.example.HomePS.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public Event createNewEvent(@RequestBody Event event){
        return eventService.save(event);
    }

    @GetMapping
    public ResponseEntity<EventResponse> getEventsByPage(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "eventId") String sortBy
    ){
        int totalPage = (int) Math.ceil(eventService.getAllEvents().size() * 1.0 / size);
        List<Event> eventList = eventService.getEventsByPage(page - 1, size, sortBy);
        return ResponseEntity.ok(new EventResponse(page, totalPage, eventList));
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
    public List<Event> searchEventByName(
            @PathVariable String query,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "eventId") String sortBy
    ) {
        return eventService.searchEventByName(query, page - 1, size, sortBy);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventService.update(id, event);
    }
}
