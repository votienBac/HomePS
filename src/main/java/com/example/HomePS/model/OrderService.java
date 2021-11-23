package com.example.HomePS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
@Data
@NoArgsConstructor
public class OrderService {
    @Id
    @JsonIgnore
    private OrderServicePK pk;
    @Column(nullable = false)
    private Integer quantity;

    public OrderService(Bill bill, ExtraService extraService, Integer quantity) {
        pk = new OrderServicePK();
        pk.setBill(bill);
        pk.setExtraService(extraService);
        this.quantity = quantity;
    }

    @Transient
    public ExtraService getService(){
        return this.pk.getExtraService();
    }

    @Transient
    public Double getTotalPrice(){
        return getService().getPrice()*getQuantity();
    }
}
