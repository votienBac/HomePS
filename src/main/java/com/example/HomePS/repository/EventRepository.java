package com.example.HomePS.repository;

import com.example.HomePS.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e WHERE e.eventId = :id AND e.deleted = FALSE ")
    Optional<Event> findEventById(@Param("id") Long id);

    @Query("SELECT e FROM Event e WHERE e.deleted = FALSE")
    List<Event> findAllEvent();

    @Query("SELECT e FROM Event e WHERE e.deleted = FALSE ")
    Page<Event> findAllEvent(Pageable pageable);

    @Query("SELECT e FROM Event e WHERE lower(e.eventName) LIKE lower(concat('%', :query, '%')) AND e.deleted = FALSE ")
    List<Event> search(@Param("query") String query);

    @Query("SELECT e FROM Event e WHERE lower(e.eventName) LIKE lower(concat('%', :query, '%')) AND e.deleted = FALSE ")
    Page<Event> search(@Param("query") String query, Pageable pageable);
}
