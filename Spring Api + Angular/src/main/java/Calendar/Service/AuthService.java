package Calendar.Service;

import Calendar.Entity.Request.UserRequest;
import Calendar.Entity.Response.AuthResponse;
import Calendar.Entity.UserEntity;
import Calendar.Repository.UserRepository;
import Calendar.Utils.Result;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${secret.key}")
    private String secretKey;

    private final long EXPIRATION_TIME = 1000 * 60 * 60;


    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String getSecretKey(){
        return secretKey;
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

    public Result <AuthResponse> logIn(@Valid UserRequest userRequest) {
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

        String token= generateToken(usuario.getName());
        AuthResponse auth= new AuthResponse(usuario,token);

        return Result.Success(auth);
    }

    private String generateToken(String username){

        Map<String,Object> claims=new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256,secretKey)
                .compact();
    }
}
