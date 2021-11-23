package com.example.HomePS.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Instant;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long eventId;
    private String eventName;
    private Instant timeStart;
    private Instant timeEnd;
    private double percentDiscount;
    private boolean enabled;

}
