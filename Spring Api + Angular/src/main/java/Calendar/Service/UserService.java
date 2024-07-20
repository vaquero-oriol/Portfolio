package Calendar.Service;

import Calendar.Entity.Request.UserRequest;
import Calendar.Entity.UserEntity;
import Calendar.Repository.UserRepository;
import jakarta.validation.Valid;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public ResponseEntity<?> CreateUSer(@Valid UserRequest userRequest){
    try {

    if (userRequest.getName() == null || userRequest.getPassword() == null) {

        return ResponseEntity.badRequest().body("Not Valid Data");
    }

        if ((userRepository.findUserByName(userRequest.getName())!=null)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya existe");
        }

    UserEntity newUser = new UserEntity(userRequest.getName(), passwordEncoder.encode(userRequest.getPassword()));
    userRepository.save(newUser);

    return ResponseEntity.ok("User created correctly");
}catch (Exception e){
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
}
    }
}
