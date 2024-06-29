package abp2.apb2_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="FriendRequest")
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    private User sender;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "receiver_id", referencedColumnName = "id")
    private User receiver;


    @Column
    private String message;

    @Column(columnDefinition = "boolean default false")
    private boolean accepted;


    public FriendRequest ( User send, User rec,String  men){
        this.sender= send;
        this.receiver= rec ;
        this.message= men;

    }
    public FriendRequest ( ){

    }

    public void accept(){
        this.accepted=true;

    }
    public void reject(){
        this.accepted=false;

    }




}
