package com.example.HomePS.service;

import com.example.HomePS.model.DailyEvent;
import com.example.HomePS.model.Event;
import com.example.HomePS.model.ExtraService;
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

    public List<DailyEvent> getAllDailyEvents() {
        return dailyEventRepository.findAll();
    }

    public List<DailyEvent> getDailyEventsByPage(Integer pageNumber, Integer pageSize, String sortBy){
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<DailyEvent> result = dailyEventRepository.findAll(pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<DailyEvent> searchEventByName(String query) {
        return dailyEventRepository.search(query);
    }
    public List<DailyEvent> searchEventByName(String query, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<DailyEvent> result = dailyEventRepository.search(query, pageable);
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
        if (dailyEvent.getTimeStart().compareTo(dailyEvent.getTimeEnd()) > 0)
            throw new IllegalArgumentException("Start date cannot be after end date.");
        if (0 > dailyEvent.getPercentDiscount() || dailyEvent.getPercentDiscount() > 100)
            throw new IllegalArgumentException("Discount percent cannot be negative or greater than 100");
        else return dailyEventRepository.save(dailyEvent);
    }

    public void delete(long id){
        dailyEventRepository.deleteById(id);
    }

    public DailyEvent update(Long id, DailyEvent event) {
        if (event.getTimeStart().compareTo(event.getTimeEnd()) > 0)
            throw new IllegalArgumentException("Start date cannot be after end date.");
        if (0 > event.getPercentDiscount() || event.getPercentDiscount() > 100)
            throw new IllegalArgumentException("Discount percent cannot be negative or greater than 100");

        var oldEvent = getDailyEvent(id);
        if (event.getDailyEventName() != null)
            oldEvent.setDailyEventName((event.getDailyEventName()));
        if (event.getPercentDiscount() != 0.0)
            oldEvent.setPercentDiscount((event.getPercentDiscount()));
        if (event.getTimeStart() != null)
            oldEvent.setTimeStart((event.getTimeStart()));
        if (event.getTimeEnd() != null)
            oldEvent.setTimeEnd((event.getTimeEnd()));
        if (event.getRepeatAfterNumOfDays() != 0) {
            oldEvent.setRepeatAfterNumOfDays(event.getRepeatAfterNumOfDays());
        }
        return save(oldEvent);
    }
}
