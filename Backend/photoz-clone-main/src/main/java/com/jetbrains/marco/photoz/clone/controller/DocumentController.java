package com.jetbrains.marco.photoz.clone.controller;

import com.jetbrains.marco.photoz.clone.controller.LoginRequest;
import com.jetbrains.marco.photoz.clone.model.User;
import com.jetbrains.marco.photoz.clone.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.jetbrains.marco.photoz.clone.utils.JwtUtils.decodeToken;
import static com.jetbrains.marco.photoz.clone.utils.JwtUtils.generateToken;

@RestController
public class DocumentController {

    private final UserService UserService;

    public AuthController(UserService UserService) {
        this.UserService = UserService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = UserService.getUserByUsername(loginRequest.getUsername());
            if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
                String token;
                if (loginRequest.isRemember())
                {
                    token = generateToken(user, 24 * 60 * 60 * 14);
                }
                else
                {
                    token = generateToken(user,  60 * 60);
                }

                // Set token expiration time
                Date expirationTime = decodeToken(token).getExpiration(); // Token expires in 1 hour
                Map<String, Object> response = new HashMap<>();
                response.put("access_token", token);
                response.put("user", user); // Assuming user object is available
                response.put("token_expiration_date", expirationTime);
                response.put("message", "User logged in successfully");
                return ResponseEntity.ok()
                        .header("Authorization", "Bearer " + token)
                        .header("Expires", expirationTime.toString())
                        .body(response);

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Internal server error"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody LoginRequest signupRequest) {
        // Check if username already exists
        if (UserService.isUserExists(signupRequest.getUsername())) {
            // Username already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        } else {
            // Create new user
            User newUser = UserService.createUser(signupRequest.getUsername(), signupRequest.getPassword());
            return ResponseEntity.ok().body(Map.of("message", "User created successfully"));
        }
    }

    @GetMapping("/validate-token")
    public ResponseEntity<String> validateToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            // Extract the token from the Authorization header
            String token = authorizationHeader.replace("Bearer ", "");

            // Decode the token and retrieve its claims
            Claims claims = decodeToken(token);

            if (claims != null) {
                // Token is valid, print token information
                System.out.println("Token ID: " + claims.getId());
                System.out.println("Token Subject: " + claims.getSubject());
                System.out.println("Token Expiration: " + claims.getExpiration());

                // Check if token expiration is valid
                if (claims.getExpiration().after(new Date())) {
                    return ResponseEntity.ok("{\"message\": \"Token is valid\"}");
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Token has expired\"}");
                }
            } else {
                // Token is invalid
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid token\"}");
            }
        } catch (Exception e) {
            // Error handling
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Internal server error\"}");
        }
    }
}
