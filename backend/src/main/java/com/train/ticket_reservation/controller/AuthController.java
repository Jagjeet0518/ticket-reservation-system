package com.train.ticket_reservation.controller;

import com.train.ticket_reservation.dto.LoginRequest;
import com.train.ticket_reservation.dto.RegisterRequest;
import com.train.ticket_reservation.dto.UserResponse;
import com.train.ticket_reservation.model.User;
import com.train.ticket_reservation.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Find user by username
        User user = userRepository.findByUsername(loginRequest.getUsername()).orElse(null);

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            UserResponse response = mapUserToResponse(user);
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid username or password");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()).orElse(null) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already exists");
        }

        if (userRepository.findByEmail(registerRequest.getEmail()).orElse(null) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setMobile(registerRequest.getMobile());
        user.setRole("USER");

        User savedUser = userRepository.save(user);

        UserResponse response = mapUserToResponse(savedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private UserResponse mapUserToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setMobile(user.getMobile());
        response.setRole(user.getRole());
        return response;
    }
}