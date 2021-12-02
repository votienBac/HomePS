package com.example.HomePS.service;

import com.example.HomePS.dto.AppUserRequest;
import com.example.HomePS.model.AppUser;
import com.example.HomePS.model.Role;
import com.example.HomePS.repository.AppUserRepository;
import com.example.HomePS.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class AppUserService implements UserDetailsService {
    private AppUserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException("User not found.");

        var authorities = new ArrayList<SimpleGrantedAuthority>();
        user.getRoles().forEach(role ->
                authorities.add(new SimpleGrantedAuthority(role.getRoleName()))
        );
        return new User(user.getUsername(), user.getPassword(), authorities);
    }

    public AppUser saveUser(AppUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public AppUser changePassword(AppUserRequest userRequest) {
        var username = userRequest.getUsername();
        var oldPassword = userRequest.getOldPassword();
        var newPassword = userRequest.getNewPassword();
        var user = userRepository.findByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException("User not found.");

        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            return userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong password.");
        }
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }


    public void addRoleToUser(String username, String roleName) {
        var user = userRepository.findByUsername(username);
        var role = roleRepository.findRoleByRoleName(roleName);
        user.getRoles().add(role);
    }

    public AppUser getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found any user with this id"));
    }

    public AppUser getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public Role getRole(String roleName) {
        return roleRepository.findRoleByRoleName(roleName);
    }

    public List<AppUser> getUsers() {
        return userRepository.findAll();
    }
}
