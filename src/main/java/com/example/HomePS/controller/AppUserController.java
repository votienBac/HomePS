package com.example.HomePS.controller;

import com.example.HomePS.dto.AppUserRequest;
import com.example.HomePS.model.AppUser;
import com.example.HomePS.model.Role;
import com.example.HomePS.service.AppUserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AppUserController {
    private AppUserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<AppUser> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping("/user")
    public ResponseEntity<AppUser> saveUser(@RequestBody AppUser user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PutMapping("/user")
    public ResponseEntity<AppUser> changePassword(@RequestBody AppUserRequest appUserRequest) {
        return ResponseEntity.ok(userService.changePassword(appUserRequest));
    }

    @PostMapping("/role")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        return ResponseEntity.ok(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> saveRole(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.username, form.roleName);
        return ResponseEntity.ok().build();
    }

    @Data
    @AllArgsConstructor
    static class RoleToUserForm {
        private String username;
        private String roleName;
    }
}