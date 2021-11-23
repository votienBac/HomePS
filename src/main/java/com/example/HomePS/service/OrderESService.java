package com.example.HomePS.service;

import com.example.HomePS.model.OrderService;
import com.example.HomePS.repository.OrderServiceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class OrderESService {
    private final OrderServiceRepository orderServiceRepository;

    public OrderService create(OrderService orderService){
        return orderServiceRepository.save(orderService);
    }
}
