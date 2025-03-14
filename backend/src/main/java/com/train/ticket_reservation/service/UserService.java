package com.train.ticket_reservation.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.train.ticket_reservation.model.User;
import com.train.ticket_reservation.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userEntity = userOptional.get();
            userEntity.setName(user.getName());
            userEntity.setEmail(user.getEmail());
            return userRepository.save(userEntity);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
