package abp2.apb2_api.service;

import abp2.apb2_api.dao.MessageRepository;
import abp2.apb2_api.dao.UserRepository;
import abp2.apb2_api.model.Message;
import abp2.apb2_api.model.SendMessageData;
import abp2.apb2_api.model.User;
import jakarta.transaction.Transactional;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;



    public ResponseEntity<?>getMessageBetweenReceiverAndSender(Long idSender, Long idReceiver){
        if(idSender<=0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid id:  "+idSender);
        }
        if(idReceiver<=0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid id: "+idReceiver);
        }

        Optional<User> senderOptional= userRepository.findById(Math.toIntExact(idSender));
        Optional<User>receiverOptional= userRepository.findById(Math.toIntExact(idReceiver));

        if(senderOptional.isEmpty()||receiverOptional.isEmpty()){
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There has been a problem with an id: "+idReceiver+" or "+idReceiver);
        }

        User sender = senderOptional.get();
        User receiver= receiverOptional.get();

        return ResponseEntity.status(HttpStatus.OK).body(messageRepository.findBySenderAndReceiverOrSenderAndReceiver
                (sender,receiver,sender,receiver));

    }
    public ResponseEntity<?>sendMessage(SendMessageData sendMessageData){

        if(sendMessageData.getSenderId()<=0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid id:  "+sendMessageData.getSenderId());
        }
        if(sendMessageData.getReceiverId()<=0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid id: "+sendMessageData.getReceiverId());
        }

        Optional<User> senderOptional= userRepository.findById(Math.toIntExact(sendMessageData.getSenderId()));
        Optional<User>receiverOptional= userRepository.findById(Math.toIntExact(sendMessageData.getReceiverId()));

        if(senderOptional.isEmpty()||receiverOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There has been a problem with an id: "+
                    sendMessageData.getSenderId()+" or "+sendMessageData.getReceiverId());
        }

        User sender = senderOptional.get();
        User receiver= receiverOptional.get();

        if(sendMessageData.getText().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Text is Empty");
        }

        Message message= new Message(sender, receiver,sendMessageData.getText());

        message.setTimeStamp(LocalDateTime.now());
        messageRepository.save(message);

        return ResponseEntity.status(HttpStatus.OK).body("Se ha enviado el mensaje : \n"+message.getContent()+"\n Al usuario "+receiver.getName());

    }
    @Transactional
    public ResponseEntity<?> deleteMessage(Long idUser, Long idMessage){
        if(idUser<=0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User was found with id: "+idUser);
        }
        if(idMessage<=0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Message was found with id: "+idMessage);
        }

        Optional<User> userOptional= userRepository.findById(Math.toIntExact(idUser));
        Optional<Message> messageOptional=messageRepository.findById(idMessage);

        if(userOptional.isEmpty()|| messageOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There has been a problem with an id: "+
                idUser    +" or "+idMessage);
        }

        User user= userOptional.get();
        Message message = messageOptional.get();

        if(message.getSender()==user){
            messageRepository.deleteMessageById(idMessage);
            return ResponseEntity.status(HttpStatus.OK).body("Message was deleted succesfully");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are not the sender, you can0t delete a " +
                    "message you haven't sent");

        }
    }
    public ResponseEntity<?> updateMessage(Long idUser, Long idMessage,String text){
        if(idUser<=0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User was found with id: "+idUser);
        }
        if(idMessage<=0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Message was found with id: "+idMessage);
        }
        if(text.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Text is empty");
        }

        Optional<User> userOptional= userRepository.findById(Math.toIntExact(idUser));
        Optional<Message> messageOptional=messageRepository.findById(idMessage);

        if(userOptional.isEmpty()|| messageOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There has been a problem with an id: "+
                    idUser    +" or "+idMessage);
        }

        User user= userOptional.get();
        Message message = messageOptional.get();

        if(message.getSender()==user){
            message.setContent(text);
            messageRepository.save(message);
            return ResponseEntity.status(HttpStatus.OK).body("Message was updated correctly");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are not the sender, you can't update a " +
                    "message you haven't sent");

        }
    }

}
