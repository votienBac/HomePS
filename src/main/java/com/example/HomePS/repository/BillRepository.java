package com.example.HomePS.repository;

import com.example.HomePS.model.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findAllByTimeEndIsNull();
    Page<Bill> findAllByTimeEndIsNull(Pageable pageable);
    List<Bill> findAllByTimeEndIsNotNull();
    Page<Bill> findAllByTimeEndIsNotNull(Pageable pageable);
    @Query("SELECT b FROM Bill b WHERE lower(b.playStation.psName) LIKE lower(concat('%', :query, '%'))")
    List<Bill> searchBill(@Param("query") String query);

    @Query("SELECT b FROM Bill b WHERE lower(b.playStation.psName) LIKE lower(concat('%', :query, '%'))")
    Page<Bill> searchBill(@Param("query") String query, Pageable pageable);

    @Query("SELECT b FROM Bill b WHERE lower(b.playStation.psName) LIKE lower(concat('%', :query, '%')) AND b.isPaid = FALSE")
    List<Bill> searchUnpaidBill(@Param("query") String query);

    @Query("SELECT b FROM Bill b WHERE lower(b.playStation.psName) LIKE lower(concat('%', :query, '%')) AND b.isPaid = FALSE")
    Page<Bill> searchUnpaidBill(@Param("query") String query, Pageable pageable);

    @Query("SELECT b FROM Bill b WHERE lower(b.playStation.psName) LIKE lower(concat('%', :query, '%')) AND b.isPaid = TRUE")
    List<Bill> searchPaidBill(@Param("query") String query);

    @Query("SELECT b FROM Bill b WHERE lower(b.playStation.psName) LIKE lower(concat('%', :query, '%')) AND b.isPaid = TRUE")
    Page<Bill> searchPaidBill(@Param("query") String query, Pageable pageable);
}
