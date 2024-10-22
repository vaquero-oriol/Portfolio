package Calendar.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name="User")
@Data
@NoArgsConstructor

public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id")
    private int Id;
    @Column(name = "Name")
    private String name;
    @Column(name="Password")
    private String password;
    @JsonManagedReference

    @OneToMany(mappedBy = "user")
    private List<NotesEntity> notes;
    @OneToMany(mappedBy = "user")
    private List<EventEntity> events;

    @Column(name="ProfilePic", columnDefinition="TEXT")
    private String ProfilePic;

    @Column(name="CreationDate")
    private Date creationDate;



public UserEntity(String name,String password){
    this.name=name;
    this.password=password;
}

}
