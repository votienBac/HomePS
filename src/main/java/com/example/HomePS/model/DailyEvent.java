package com.example.HomePS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class DailyEvent{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @ApiModelProperty(hidden = true)
    private Long dailyEventId;
    @NotBlank(message = "Daily event name is required")
    private String dailyEventName;
    private Instant timeStart;
    private Instant timeEnd;
    private int repeatAfterNumOfDays;
    private double percentDiscount;

    public void setTimeAgain(){
        if(Instant.now().isAfter(this.getTimeEnd())){
            this.setTimeStart(this.getTimeStart().plus(getRepeatAfterNumOfDays(), ChronoUnit.DAYS));
            this.setTimeEnd(this.getTimeEnd().plus(getRepeatAfterNumOfDays(), ChronoUnit.DAYS));
        }
    }
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
