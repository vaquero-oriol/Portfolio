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


    public Result<UserEntity>getUserName(@Valid int id){
        if(id==0){
            return Result.Failure("Id is not Valid");

        }
        UserEntity user=userRepository.findUserById(id);

        if(user==null){
            return Result.Failure("User doesn't exist");
        }
        return Result.Success(user);
    }
}
