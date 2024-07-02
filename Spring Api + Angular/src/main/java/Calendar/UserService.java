package Calendar;

import Calendar.Entity.Request.UserRequest;
import Calendar.Entity.UserEntity;
import Calendar.Repository.UserRepository;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> CraeteUSer(UserRequest userRequest){

        if(userRequest.getName()!=null && userRequest.getPassword()!=null){

            return ResponseEntity.badRequest().body("Not Valid Data");
        }
        if(userRepository.findUserByName(userRequest.getName())!=null){
            UserEntity user= new UserEntity(userRequest.getName(),userRequest.getPassword());
            userRepository.save(user);
        return ResponseEntity.ok(user);
        }else{

            return ResponseEntity.badRequest().body("User already Exists");

        }

    }
}
