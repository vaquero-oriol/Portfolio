package Calendar.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="Errand")
@Data
public class ErrandEntity  extends EventEntity{
    private static int counter=0;

    @Column(name="Name")
    private String name;

    @Column(name="Description")
    private String Description;

    @Column(name="Content")
    private String content;
    @PrePersist
    private void prePersist(){
        this.setId("Erra_"+counter++);
    }
}
