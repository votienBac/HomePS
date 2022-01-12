package com.example.HomePS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ExtraService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(hidden = true)
    private Long serviceId;

    @NotNull(message = "Service name is required.")
    @Basic(optional = false)
    private String serviceName;
    @Column(nullable = false)
    private double price;

    @JsonIgnore
    @Column(nullable=false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean deleted = false;
    @JsonIgnore
    public boolean isDeleted() {
        return deleted;
    }
}
