package abp2.apb2_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Statue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    @Lob
    private String description;

    @Column(columnDefinition = "TEXT")
    @Lob
    private String author_date;

    @Column(columnDefinition = "TEXT")
    @Lob
    private String material;

    @Column
    private float latitude;

    @Column
    private float longitude;

    @Column
    private String image_url;

    @ManyToMany(mappedBy = "statues")
    @JsonIgnore
    private Set<User> users = new HashSet<>();
}
