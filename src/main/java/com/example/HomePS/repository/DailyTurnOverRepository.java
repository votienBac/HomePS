package com.example.HomePS.repository;

import com.example.HomePS.model.Daily_TurnOver;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DailyTurnOverRepository extends JpaRepository<Daily_TurnOver, Long> {
    Daily_TurnOver findDaily_TurnOverByDate(LocalDate date);
    List<Daily_TurnOver> findDaily_TurnOverByDateBetween(LocalDate dateStart, LocalDate dateEnd);

}
