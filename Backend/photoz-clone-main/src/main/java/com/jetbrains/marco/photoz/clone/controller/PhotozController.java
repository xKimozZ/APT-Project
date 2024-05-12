package com.jetbrains.marco.photoz.clone.web;

import com.jetbrains.marco.photoz.clone.controller.LoginRequest;
import com.jetbrains.marco.photoz.clone.model.Photo;
import com.jetbrains.marco.photoz.clone.service.PhotozService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.Collection;

@RestController
public class PhotozController {


    private final PhotozService photozService;

    public PhotozController(PhotozService photozService) {
        this.photozService = photozService;
    }

    @GetMapping("/")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/photoz")
    public Iterable<Photo> get() {
        return photozService.get();
    }

    @GetMapping("/photoz/{id}")
    public Photo get(@PathVariable Integer id) {
        Photo photo = photozService.get(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return photo;
    }

    @GetMapping("/test/{name}")
    public String test(@PathVariable String name) {
        return "Hello "+name;
    }

    @DeleteMapping("/photoz/{id}")
    public void delete(@PathVariable Integer id) {
        photozService.remove(id);
    }

    @PostMapping("/photoz")
    public Photo create(@RequestPart("data") MultipartFile file) throws IOException {
        return photozService.save(file.getOriginalFilename(), file.getContentType(), file.getBytes());
    }
/*
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("a7a");
        System.out.println(loginRequest.getUsername());
        // Your login logic here
        // You can access username, password, and remember fields from loginRequest object

        // Example logic: check username and password
        if ("valid_username".equals(loginRequest.getUsername()) && "valid_password".equals(loginRequest.getPassword())) {
            // Authentication successful
            return ResponseEntity.ok().build();
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody LoginRequest signupRequest) {
        // Your signup logic here
        // You can access username and password fields from signupRequest object

        // Example logic: check if the username is available and create a new user
        // Replace this with your actual signup logic
        if ("existing_username".equals(signupRequest.getUsername())) {
            // Username already exists
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        } else {
            // User creation successful
            return ResponseEntity.ok().body("User created successfully");
        }
    }
*/
}
