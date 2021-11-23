package com.example.HomePS.repository;

import com.example.HomePS.model.ExtraService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<ExtraService, Long> {
}
