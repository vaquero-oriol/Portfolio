package abp2.apb2_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User sender;
    @ManyToOne
    private User receiver;
    private String content;
    private LocalDateTime timeStamp;

    public Message(){

    }
    public Message(User sender, User receiver, String text) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = text;
    }



}
