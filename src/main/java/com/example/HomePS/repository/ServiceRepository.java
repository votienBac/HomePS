package com.example.HomePS.repository;

import com.example.HomePS.model.ExtraService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ExtraService, Long> {
    @Query("SELECT e FROM ExtraService e WHERE e.serviceName LIKE %?1%")
    List<ExtraService> search(String query);
}
