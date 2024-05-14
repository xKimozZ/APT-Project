package com.apt.texteditor.service;

import com.apt.texteditor.model.User;
import com.apt.texteditor.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UsersRepository userRepository;
    @Autowired
    public UserService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public boolean isUserExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public User createUser(String username, String password) {
        User user = new User(username, password);
        return userRepository.save(user);
    }
}
