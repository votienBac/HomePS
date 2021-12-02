package com.example.HomePS.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUserRequest {
    private String username;
    private String oldPassword;
    private String newPassword;
}
