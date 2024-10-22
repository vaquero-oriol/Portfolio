package Calendar.Entity.Response;

import Calendar.Entity.UserEntity;

public class AuthResponse {
    private UserEntity user;
    private String token;


    public AuthResponse(UserEntity user, String token) {
        this.user = user;
        this.token = token;
    }


    public UserEntity getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }
}