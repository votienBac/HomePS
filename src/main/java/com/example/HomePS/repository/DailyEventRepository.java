package com.example.HomePS.repository;

import com.example.HomePS.model.DailyEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DailyEventRepository extends JpaRepository<DailyEvent, Long> {
    @Query("SELECT e FROM DailyEvent e WHERE e.dailyEventId = :id AND e.deleted = FALSE ")
    Optional<DailyEvent> findDailyEventById(@Param("id") Long id);

    @Query("SELECT e FROM DailyEvent e WHERE e.deleted = FALSE")
    List<DailyEvent> findAllDailyEvent();

    @Query("SELECT e FROM DailyEvent e WHERE e.deleted = FALSE")
    Page<DailyEvent> findAllDailyEvent(Pageable pageable);

    @Query("SELECT e FROM DailyEvent e WHERE lower(e.dailyEventName) LIKE lower(concat('%', :query, '%')) AND e.deleted = FALSE")
    List<DailyEvent> search(@Param("query") String query);

    @Query("SELECT e FROM DailyEvent e WHERE lower(e.dailyEventName) LIKE lower(concat('%', :query, '%')) AND e.deleted = FALSE")
    Page<DailyEvent> search(@Param("query") String query, Pageable pageable);
}
