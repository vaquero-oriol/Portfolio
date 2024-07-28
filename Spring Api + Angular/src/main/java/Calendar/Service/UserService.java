package Calendar.Service;

import Calendar.Entity.Request.UserRequest;
import Calendar.Entity.UserEntity;
import Calendar.Repository.UserRepository;
import Calendar.Utils.Exceptions;
import Calendar.Utils.Result;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public Result<UserEntity> createUser(@Valid UserRequest userRequest) {
        if (userRequest.getName() == null || userRequest.getPassword() == null) {
            return Result.Failure("Not valid data");
        }

        if (userRepository.findUserByName(userRequest.getName()) != null) {
            return Result.Failure("User already exists");
        }

        try {
            UserEntity newUser = new UserEntity(userRequest.getName(), passwordEncoder.encode(userRequest.getPassword()));
            userRepository.save(newUser);
            return Result.Success(newUser);
        } catch (Exception e) {
            return Result.Failure("Error creating user: " + e.getMessage());
        }
    }

    public Result<UserEntity> logIn(@Valid UserRequest userRequest) {
        if (userRequest.getName() == null || userRequest.getPassword() == null) {
            return Result.Failure("Name or Password is null");
        }

        UserEntity usuario = userRepository.findUserByName(userRequest.getName());
        if (usuario == null) {
            return Result.Failure("User doesn't exist");
        }

        if (!passwordEncoder.matches(userRequest.getPassword(), usuario.getPassword())) {
            return Result.Failure("Credentials are not the same");
        }

        return Result.Success(usuario);
    }
}
