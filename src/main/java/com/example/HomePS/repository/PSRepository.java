package com.example.HomePS.repository;

import com.example.HomePS.model.PlayStation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface PSRepository extends JpaRepository<PlayStation, Long> {
    //Optional<PlayStation> findByPSName(String psName);
    Page<PlayStation> findAllByPsStatus(Integer psStatus, Pageable pageable);
}
