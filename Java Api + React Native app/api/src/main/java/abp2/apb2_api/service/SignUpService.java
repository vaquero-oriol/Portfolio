package abp2.apb2_api.service;

import abp2.apb2_api.dao.SignUpRepository;
import abp2.apb2_api.model.User;
import abp2.apb2_api.model.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {
    @Autowired
    private SignUpRepository repository;

    public ResponseEntity<?> signUp(UserRequest user) {
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid user data provided.");
        }
        if (this.repository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists. Please use a" +
                    " different email.");
        }

        try {
            this.repository.save(new User(user.getEmail(), user.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create user. Please try " +
                    "again later.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully.");
    }
}
