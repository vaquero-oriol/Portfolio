package abp2.apb2_api.model;

import lombok.Data;

@Data

public class FriendRequestData {

    private int senderId;
    private int receiverId;
    private String  message;
}
