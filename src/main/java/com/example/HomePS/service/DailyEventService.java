package com.example.HomePS.service;

import com.example.HomePS.model.DailyEvent;
import com.example.HomePS.model.Event;
import com.example.HomePS.repository.DailyEventRepository;
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
public class DailyEventService {
    private final DailyEventRepository dailyEventRepository;

    public Iterable<DailyEvent> getDailyEventsByPage(Integer pageNumber, Integer pageSize, String sortBy){
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<DailyEvent> result = dailyEventRepository.findAll(pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public DailyEvent getDailyEvent(long id){
        return dailyEventRepository
                .findById(id)
                .orElseThrow(()->new IllegalStateException("Event not found!"));


    }
    public DailyEvent save(DailyEvent dailyEvent){
        return dailyEventRepository.save(dailyEvent);
    }

    public void delete(long id){
        dailyEventRepository.deleteById(id);
    }
}
