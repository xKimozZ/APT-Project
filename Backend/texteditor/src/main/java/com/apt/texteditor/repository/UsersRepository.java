package com.apt.texteditor.repository;

import com.apt.texteditor.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UsersRepository extends MongoRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
