package com.example.HomePS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

    @JsonIgnore
    @Column(nullable=false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean deleted = false;
    @JsonIgnore
    public boolean isDeleted() {
        return deleted;
    }
}
