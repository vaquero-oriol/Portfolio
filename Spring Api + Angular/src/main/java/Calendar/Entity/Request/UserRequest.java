package Calendar.Entity.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserRequest {
    @NotEmpty(message = "Name cannot be empty")

    private String name;
    @NotEmpty(message = "Password cannot be empty")
    private String password;
    @NotEmpty(message = "Confirm Password cannot be empty")

    private String confirmPassword;



}
