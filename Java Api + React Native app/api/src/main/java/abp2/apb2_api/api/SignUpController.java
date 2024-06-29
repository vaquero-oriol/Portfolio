package abp2.apb2_api.api;

import abp2.apb2_api.model.UserRequest;
import abp2.apb2_api.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {
    @Autowired
    private SignUpService service;

    @PostMapping("/signup")
    private ResponseEntity<?> signUp(@RequestBody UserRequest user) {
        return this.service.signUp(user);
    }
}
