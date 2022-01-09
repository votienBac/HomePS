package com.example.HomePS.repository;

import com.example.HomePS.model.PlayStation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PSRepository extends JpaRepository<PlayStation, Long> {
    List<PlayStation> findAllByPsStatus(Integer psStatus);
    Page<PlayStation> findAllByPsStatus(Integer psStatus, Pageable pageable);
    @Query("SELECT p FROM PlayStation p WHERE p.psName LIKE %?1%")
    Page<PlayStation> search(String query, Pageable pageable);
}
