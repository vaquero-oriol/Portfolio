package abp2.apb2_api.service;

import abp2.apb2_api.dao.LoginRepository;
import abp2.apb2_api.model.User;
import abp2.apb2_api.model.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginRepository loginRepository;

    public ResponseEntity<?> login(UserRequest userRequest) {
        if (userRequest == null) {
            return ResponseEntity.notFound().build();
        }
        User user = this.loginRepository.findByEmailAndPassword(userRequest.getEmail(), userRequest.getPassword());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials. Please check your email and password.");
        }
        return ResponseEntity.ok().body("Login successful. Welcome!");
    }

}
