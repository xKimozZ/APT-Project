package com.jetbrains.marco.photoz.clone.repository;

import com.jetbrains.marco.photoz.clone.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UsersRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
