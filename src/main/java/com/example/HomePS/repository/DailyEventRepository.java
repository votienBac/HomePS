package com.example.HomePS.repository;

import com.example.HomePS.model.DailyEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyEventRepository extends JpaRepository<DailyEvent, Long> {
}
