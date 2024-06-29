package abp2.apb2_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;
}
