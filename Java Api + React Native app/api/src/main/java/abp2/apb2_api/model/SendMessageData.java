package abp2.apb2_api.model;

import lombok.Data;

@Data
public class SendMessageData {

    private Long senderId;
    private Long receiverId;
    private String text;

}
