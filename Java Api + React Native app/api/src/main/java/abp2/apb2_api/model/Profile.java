package abp2.apb2_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Profile {
    private String name;
    private String email;
    private Theme theme;
    private byte[] image;
}
