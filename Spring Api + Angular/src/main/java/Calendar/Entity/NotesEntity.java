package Calendar.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

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

    @Column(name="Content", columnDefinition="TEXT")
    private String content;
    @ElementCollection
    @CollectionTable(name="NoteImages", joinColumns=@JoinColumn(name="note_id"))
    @Column(name="url")
    private List<String> imageUrls;

    @ElementCollection
    @CollectionTable(name="NoteAudios", joinColumns=@JoinColumn(name="note_id"))
    @Column(name="url")
    private List<String> audioUrls;
    @JsonBackReference

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
