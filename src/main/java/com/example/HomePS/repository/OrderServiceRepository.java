package com.example.HomePS.repository;

import com.example.HomePS.model.OrderService;
import com.example.HomePS.model.OrderServicePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderServiceRepository extends JpaRepository<OrderService, OrderServicePK> {
    @Query("SELECT o FROM OrderService o WHERE o.pk.bill.billId = ?1")
    List<OrderService> findAllByBillId(Long billId);
}
