package com.example.HomePS.service;

import com.example.HomePS.model.OrderService;
import com.example.HomePS.repository.OrderServiceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class OrderESService {
    private final OrderServiceRepository orderServiceRepository;

    public OrderService create(OrderService orderService){
        var existedOrderService = orderServiceRepository.findById(orderService.getPk());
        if(existedOrderService.isPresent()) {
            var quantity = orderService.getQuantity()+existedOrderService.get().getQuantity();
            if (quantity <= 0) quantity = 0;
            orderService.setQuantity(quantity);
        }
        return orderServiceRepository.save(orderService);
    }

    public void delete(OrderService orderService) {
        orderServiceRepository.delete(orderService);
    }

    public List<OrderService> getAllOrderById(Long billId) {
        return orderServiceRepository.findAllByBillId(billId);

    }
}
