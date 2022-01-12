package com.example.HomePS.service;

import com.example.HomePS.model.Event;
import com.example.HomePS.model.ExtraService;
import com.example.HomePS.model.PlayStation;
import com.example.HomePS.repository.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class EventService {
    private final EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAllEvent();
    }

    public List<Event> getEventsByPage(Integer pageNumber, Integer pageSize, String sortBy){
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Event> result = eventRepository.findAllEvent(pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<Event> searchEventByName(String query) {
        return eventRepository.search(query);
    }
    public List<Event> searchEventByName(String query, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Event> result = eventRepository.search(query, pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public Event getEvent(long id){
        return eventRepository
                .findEventById(id)
                .orElseThrow(()->new IllegalStateException("Event not found!"));
    }
    public Event save(Event event){
        if (event.getTimeStart().compareTo(event.getTimeEnd()) > 0)
            throw new IllegalArgumentException("Start date cannot be after end date.");
        if (0 > event.getPercentDiscount() || event.getPercentDiscount() > 100)
            throw new IllegalArgumentException("Discount percent cannot be negative or greater than 100");
        else return eventRepository.save(event);
    }

    public void delete(long id){
        var toDelete = getEvent(id);
        toDelete.setDeleted(true);
        save(toDelete);
    }

    public Event update(long id, Event event) {
        if (event.getTimeStart().compareTo(event.getTimeEnd()) > 0)
            throw new IllegalArgumentException("Start date cannot be after end date.");
        if (0 > event.getPercentDiscount() || event.getPercentDiscount() > 100)
            throw new IllegalArgumentException("Discount percent cannot be negative or greater than 100");

        var oldEvent = getEvent(id);
        if (event.getEventName() != null)
            oldEvent.setEventName((event.getEventName()));
        if (event.getPercentDiscount() != 0.0)
            oldEvent.setPercentDiscount((event.getPercentDiscount()));
        if (event.getTimeStart() != null)
            oldEvent.setTimeStart((event.getTimeStart()));
        if (event.getTimeEnd() != null)
            oldEvent.setTimeEnd((event.getTimeEnd()));
        return save(oldEvent);
    }


}
