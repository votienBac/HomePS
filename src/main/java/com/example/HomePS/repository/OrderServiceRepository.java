package com.example.HomePS.repository;

import com.example.HomePS.model.OrderService;
import com.example.HomePS.model.OrderServicePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderServiceRepository extends JpaRepository<OrderService, OrderServicePK> {
}
