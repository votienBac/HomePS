package com.example.HomePS.service;

import com.example.HomePS.model.Event;
import com.example.HomePS.model.PlayStation;
import com.example.HomePS.repository.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class EventService {
    private final EventRepository eventRepository;

    public Iterable<Event> getAllEvent(){
        return eventRepository.findAll();
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
