package Calendar.Controller;

import Calendar.Entity.Request.UserRequest;
import Calendar.Entity.UserEntity;
import Calendar.Service.UserService;
import Calendar.Utils.Result;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRequest userRequest) {
        Result<UserEntity> result = userService.createUser(userRequest);

        if (result.isSucces()) {
            return ResponseEntity.ok(result.getValue());
        } else {
            return ResponseEntity.badRequest().body(result.getError());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> logIn(@Valid @RequestBody UserRequest userRequest) {
        Result<UserEntity> result = userService.logIn(userRequest);

        if (result.isSucces()) {
            return ResponseEntity.ok(result.getValue());
        } else {
            return ResponseEntity.badRequest().body(result.getError());
        }
    }
}
