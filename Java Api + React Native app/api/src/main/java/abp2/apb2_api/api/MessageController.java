package abp2.apb2_api.api;


import abp2.apb2_api.model.Message;
import abp2.apb2_api.model.SendMessageData;
import abp2.apb2_api.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {
    @Autowired
    private MessageService messageService;


    @GetMapping
    public ResponseEntity<?> getMessage(@RequestParam Long idSender, @RequestParam Long idReceiver){
        return messageService.getMessageBetweenReceiverAndSender(idSender,idReceiver);
    }

    @PostMapping
    public ResponseEntity<?>sendMessage(@RequestBody SendMessageData sendMessageData){
        return messageService.sendMessage(sendMessageData);
    }
    @DeleteMapping
    public ResponseEntity<?>deleteMessage(@RequestParam Long idUser,@RequestParam Long idMessage){
        return messageService.deleteMessage(idUser,idMessage);
    }
    @PutMapping
    public ResponseEntity<?>updateMessage(@RequestParam Long idUser, @RequestParam Long idMessage, @RequestBody String text){
        return messageService.updateMessage(idUser,idMessage,text);
    }



}
