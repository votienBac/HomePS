package com.example.HomePS.repository;

import com.example.HomePS.model.ExtraService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<ExtraService, Long> {
    @Query("SELECT e FROM ExtraService e WHERE e.serviceId = :id AND e.deleted = FALSE ")
    Optional<ExtraService> findServiceById(@Param("id") Long id);

    @Query("SELECT e FROM ExtraService e WHERE e.deleted = FALSE")
    List<ExtraService> findAllService();

    @Query("SELECT e FROM ExtraService e WHERE e.deleted = FALSE")
    Page<ExtraService> findAllService(Pageable pageable);

    @Query("SELECT e FROM ExtraService e WHERE lower(e.serviceName) LIKE lower(concat('%', :query, '%')) AND e.deleted = FALSE")
    List<ExtraService> search(@Param("query") String query);

    @Query("SELECT e FROM ExtraService e WHERE lower(e.serviceName) LIKE lower(concat('%', :query, '%')) AND e.deleted = FALSE")
    Page<ExtraService> search(@Param("query") String query, Pageable pageable);
}

