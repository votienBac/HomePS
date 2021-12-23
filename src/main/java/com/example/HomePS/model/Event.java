package com.example.HomePS.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.time.Instant;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @ApiModelProperty(hidden = true)
    private Long eventId;
    private String eventName;
    private Instant timeStart;
    private Instant timeEnd;
    private double percentDiscount;
    @Transient
    public boolean isHappenning(){
        if(Instant.now().isBefore(this.timeEnd) && Instant.now().isAfter(this.timeStart)){
            return true;
        }
        return false;
    }

}
