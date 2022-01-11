package com.example.HomePS.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PlayStation {
    public static final int FREE = 0;
    public static final int BUSY = 1;
    public static final int BROKEN = 2;
    public static final int DELETED = 3;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(hidden = true)
    private Long psId;
    @NotBlank(message = "PS name is required")
    private String psName;
    private Integer psStatus;

    @Getter(AccessLevel.NONE)
    private String psState;

    public String getPsState() {
        switch (psStatus) {
            case FREE:
                return "Trống";
            case BUSY:
                return "Đang sử dụng";
            case BROKEN:
                return "Đang hỏng";
            case DELETED:
                return "Đã xoá";
            default:
                return "undefined";
        }
    }
}
