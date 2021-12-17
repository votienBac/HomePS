package com.example.HomePS.model;



import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="orderServices")
public class Bill {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long billId;
    private Instant timeStart;
    private Instant timeEnd;
    private boolean isPaid;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "psId", referencedColumnName = "psId")
    private PlayStation playStation;

    @OneToMany(mappedBy = "pk.bill")
   // @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<OrderService> orderServices = new ArrayList<>();


    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "eventId", referencedColumnName = "eventId")
    private Event event;
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "dailyEventId", referencedColumnName = "dailyEventId")
    private DailyEvent dailyEvent;
    private Double totalHourPlayed;
    private Double totalPrice;


}
