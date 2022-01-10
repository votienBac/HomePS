package com.example.HomePS.repository;

import com.example.HomePS.model.ExtraService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ExtraService, Long> {
    @Query("SELECT e FROM ExtraService e WHERE lower(e.serviceName) LIKE lower(concat('%', :query, '%'))")
    List<ExtraService> search(@Param("query") String query);
    @Query("SELECT e FROM ExtraService e WHERE lower(e.serviceName) LIKE lower(concat('%', :query, '%'))")
    Page<ExtraService> search(@Param("query") String query, Pageable pageable);
}

