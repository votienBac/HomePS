package com.example.HomePS.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PlayStation {
    public static final int FREE = 0;
    public static final int BUSY = 1;
    public static final int BROKEN = 2;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long psId;
    @NotBlank(message = "PS name is required")
    private String psName;
    private Integer psStatus;

    @Getter(AccessLevel.NONE)
    private String psState;
    public String getPsState() {
        switch (psStatus) {
            case FREE: return "Trống";
            case BUSY: return "Đang sử dụng";
            case BROKEN: return "Đang hỏng";
            default: return "undefined";
        }
    }
}
