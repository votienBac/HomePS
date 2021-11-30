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

    public Iterable<Event> getAllEvent(Integer pageNumber, Integer pageSize, String sortBy){
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Event> result = eventRepository.findAll(pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public Event getEvent(long id){
        return eventRepository
                .findById(id)
                .orElseThrow(()->new IllegalStateException("Event not found!"));


    }
    public Event save(Event event){
        return eventRepository.save(event);
    }

    public void delete(long id){
        eventRepository.deleteById(id);
    }
}
