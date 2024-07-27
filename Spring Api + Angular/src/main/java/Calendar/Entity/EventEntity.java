package Calendar.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name="Event")
//Generates tables to whatever inherits this class
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public class EventEntity {
    @Id
    @Column(name="Id")
    private String id;
    @Column(name="Name")
    private String name;
    @Column(name="StartDate")
    private Date startDate;
    @Column(name="FinishDate")
    private Date finishDate;
    @Column(name="Priority")
    private int priority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
