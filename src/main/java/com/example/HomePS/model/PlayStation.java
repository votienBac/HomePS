package com.example.HomePS.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PlayStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long psId;
    private String psName;
    private String psState;
    private boolean enabled;
}
