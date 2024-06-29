package abp2.apb2_api.model;

import lombok.Data;

@Data
public class FriendRequestAccept {
    private long friendRequestId;
    private boolean accepted;
    
    public void accept(){
        this.accepted=true;

    }
    public void reject(){
        this.accepted=false;

    }
}