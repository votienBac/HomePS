package com.example.HomePS.repository;

import com.example.HomePS.model.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    Page<Bill> findAllByTimeEndIsNull(Pageable pageable);
    Page<Bill> findAllByTimeEndIsNotNull(Pageable pageable);
}
