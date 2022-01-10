package com.example.HomePS.repository;

import com.example.HomePS.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e WHERE lower(e.eventName) LIKE lower(concat('%', :query, '%'))")
    List<Event> search(@Param("query") String query);
    @Query("SELECT e FROM Event e WHERE lower(e.eventName) LIKE lower(concat('%', :query, '%'))")
    Page<Event> search(@Param("query") String query, Pageable pageable);
}
