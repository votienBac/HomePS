package com.example.HomePS.repository;

import com.example.HomePS.model.PlayStation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PSRepository extends JpaRepository<PlayStation, Long> {
    @Query("SELECT p FROM PlayStation p WHERE p.psStatus <> 3")
    List<PlayStation> findAllPs();
    @Query("SELECT p FROM PlayStation p WHERE p.psStatus <> 3")
    Page<PlayStation> findAllPs(Pageable pageable);

    List<PlayStation> findAllByPsStatus(int status);
    Page<PlayStation> findAllByPsStatus(int psStatus, Pageable pageable);

    @Query("SELECT p FROM PlayStation p WHERE lower(p.psName) LIKE lower(concat('%', :query, '%')) AND p.psStatus <> 3")
    Page<PlayStation> search(@Param("query") String query, Pageable pageable);
    @Query("SELECT p FROM PlayStation p WHERE lower(p.psName) LIKE lower(concat('%', :query, '%')) AND p.psStatus <> 3")
    List<PlayStation> search(@Param("query") String query);

    @Query("SELECT p FROM PlayStation p WHERE lower(p.psName) LIKE lower(concat('%', :query, '%')) AND p.psStatus = :status")
    Page<PlayStation> searchByStatus(@Param("query") String query, @Param("status") int status, Pageable pageable);
    @Query("SELECT p FROM PlayStation p WHERE lower(p.psName) LIKE lower(concat('%', :query, '%')) AND p.psStatus = :status")
    List<PlayStation> searchByStatus(@Param("query") String query, @Param("status") int status);
}
