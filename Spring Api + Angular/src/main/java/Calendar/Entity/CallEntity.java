package Calendar.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name="VideoCall")
@Data
public class CallEntity extends EventEntity{
    private static  int counter=0;

    @Column(name="Name")
    private String name;

    @Column(name="Participants")
    private String participants;

    @Column(name="Description")
    private String description;

    @PrePersist
    private void prePersist(){
        this.setId("Call_"+counter++);
    }

}
