package Calendar.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name="Notes")
@Data
public class NotesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id")
    private int id;
    @Column(name="Name")
    public String name;

    @Column(name="CreationDate")
    private Date creationDate;

    @Column(name="Content")
    private String content;
    @Column(name="ImageUrls")
    private String imageUrls;

    @Column(name="AudioUrls")
    private String audioUrls;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
