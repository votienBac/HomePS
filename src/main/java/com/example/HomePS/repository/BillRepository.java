package com.example.HomePS.repository;

import com.example.HomePS.model.Bill;
import com.example.HomePS.model.PlayStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
}
