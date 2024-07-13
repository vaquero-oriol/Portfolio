package Calendar.Entity.Request;

import lombok.Data;

@Data
public class UserRequest {
    private String name;
    private String password;
    private String confirmPassword;


}
