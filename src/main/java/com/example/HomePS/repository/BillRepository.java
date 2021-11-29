package com.example.HomePS.repository;

import com.example.HomePS.model.Bill;
import com.example.HomePS.model.PlayStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    Iterable<Bill> findAllByTimeEndIsNull();
    Iterable<Bill> findAllByTimeEndIsNotNull();
}
