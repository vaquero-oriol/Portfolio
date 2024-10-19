package Calendar.Controller;

import Calendar.Entity.Request.UserRequest;
import Calendar.Entity.Response.AuthResponse;
import Calendar.Entity.UserEntity;
import Calendar.Service.AuthService;
import Calendar.Service.UserService;
import Calendar.Utils.Result;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    @Autowired
    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRequest userRequest) {
        Result<UserEntity> result = authService.createUser(userRequest);

        if (result.isSucces()) {
            return ResponseEntity.ok(result.getValue());
        } else {
            return ResponseEntity.badRequest().body(result.getError());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> logIn(@Valid @RequestBody UserRequest userRequest) {
        Result<AuthResponse> result = authService.logIn(userRequest);

        if (result.isSucces()) {
            return ResponseEntity.ok(result.getValue());
        } else {
            return ResponseEntity.badRequest().body(result.getError());
        }
    }

    @GetMapping("/name")
    public ResponseEntity<?>userName(@Valid @RequestParam int id){
        Result<UserEntity> result=userService.getUserName(id);
        if(result.isSucces()){
            return ResponseEntity.ok(result.getValue());
        }else{
            return ResponseEntity.badRequest().body(result.getError());
        }
    }
}
