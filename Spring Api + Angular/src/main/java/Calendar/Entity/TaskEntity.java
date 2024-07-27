package Calendar.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="Task")
@Data
public class TaskEntity extends EventEntity{
    private static int counter=0;
    @Column(name="Name")
    private String name;
    @Column(name="Content")
    private String content;

    @Column(name="Description")
    private String Description;

    @Column(name="TimeSpent")
    private double spentTime;

    @PrePersist
    private void prePersist(){
        this.setId("Task_"+counter++);
    }


}
