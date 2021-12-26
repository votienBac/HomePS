package com.example.HomePS.repository;

import com.example.HomePS.model.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    Page<Bill> findAllByTimeEndIsNull(Pageable pageable);
    Page<Bill> findAllByTimeEndIsNotNull(Pageable pageable);
    @Query("SELECT b FROM Bill b WHERE b.playStation.psName LIKE %?1%")
    List<Bill> search(String query);
}
