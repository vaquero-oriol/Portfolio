package abp2.apb2_api.api;

import abp2.apb2_api.model.UserRequest;
import abp2.apb2_api.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    private LoginService service;

    @GetMapping("/login")
    private ResponseEntity<?> login(@RequestBody UserRequest ur) {return this.service.login(ur);}
}