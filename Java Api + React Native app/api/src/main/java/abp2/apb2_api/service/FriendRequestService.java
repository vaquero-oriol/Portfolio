package abp2.apb2_api.service;

import abp2.apb2_api.dao.FriendRespository;
import abp2.apb2_api.dao.StatueRepository;
import abp2.apb2_api.dao.UserRepository;
import abp2.apb2_api.model.*;
import jakarta.transaction.Transactional;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FriendRequestService {
    @Autowired
    private FriendRespository friendRespository;

    @Autowired
    private UserRepository userRepository;


    public ResponseEntity<?> getFriendRequest(long id) {
        if (id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Id");
        }
        Optional<User> userOptional = userRepository.findById((int) id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id: " + id + " was not found");
        }
        User user = userOptional.get();

        List<FriendRequest> friendRequests = friendRespository.findByReceiverOrSender(user);

        if (friendRequests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No friend requests were found for the user this " +
                    "user.");
        }

        return ResponseEntity.ok(friendRequests);
    }

    public ResponseEntity<?> deleteFriendRequest(long friendRequestId) {

        if (friendRequestId == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The id is 0");

        }
        Optional<FriendRequest> friendRequestOptional = friendRespository.findById(friendRequestId);

        if (friendRequestOptional.isPresent()) {
            friendRespository.delete(friendRequestOptional.get());

            Optional<FriendRequest> deletedFriendRequest = friendRespository.findById(friendRequestId);

            if (deletedFriendRequest.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Friend Request deleted Succesfully");

            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Friend Request wasn't deleted, " +
                        "try again later");

            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Friend request not found");
        }
    }


    public ResponseEntity<?> friendsById(long id) {
        if (id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id is null");
        }

        Optional<User> userOptional = userRepository.findById((int) id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't find User with id:" + id);
        }

        List<User> userFriends = friendRespository.friendsByUserId((int) id);

        if (userFriends.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldn't find any friend for user with id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(userFriends);
        }
    }

    public ResponseEntity<?> getFriendsProgress(long id) {
        Optional<User> userOptional = userRepository.findById((int) id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldn't find user with id: " + id);
        }

        User user = userOptional.get();
        Set<User> userFriends = user.getFriends();
        List<Map<String, Object>> friendsProgress = new ArrayList<>();

        int userStatues = userRepository.countUserStatues(user.getId());
        long totalStatues = userRepository.count();
        long userProgress = (userStatues * 100) / totalStatues;

        for (User friend : userFriends) {
            Map<String, Object> friendProgressMap = new HashMap<>();
            friendProgressMap.put("userId", friend.getId());
            friendProgressMap.put("userName", friend.getName());

            int friendStatues = userRepository.countUserStatues(friend.getId());
            long friendsProgressNum = (friendStatues * 100L) / totalStatues;

            friendProgressMap.put("progress", friendsProgressNum);
            friendsProgress.add(friendProgressMap);
        }

        return ResponseEntity.ok().body(friendsProgress);
    }

    public ResponseEntity<String> sendFriendRequest(FriendRequestData friendRequestData) {

        if (friendRequestData.getSenderId() <= 0 || friendRequestData.getReceiverId() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid senderId or receiverId provided");
        }
        Optional<User> senderOp = userRepository.findById(friendRequestData.getSenderId());
        Optional<User> receiverOp = userRepository.findById(friendRequestData.getReceiverId());

        if (senderOp.isPresent() && receiverOp.isPresent()) {
            User sender = senderOp.get();
            User receiver = receiverOp.get();

            if (sender.getFriends().contains(receiver)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Users are already friends");
            }
            FriendRequest friendRequest = new FriendRequest(sender, receiver, friendRequestData.getMessage());

            friendRespository.save(friendRequest);

            return ResponseEntity.status(HttpStatus.OK).body("Friend Request was send to user with id:" + receiver.getId());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User was not found");
        }
    }

    @Transactional
    public ResponseEntity<?> acceptFriendRequest(FriendRequestAccept friendRequestAccept) {


        if (friendRequestAccept.getFriendRequestId() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Id, try again");

        }
        Optional<FriendRequest> optionalFriendRequest =
                Optional.ofNullable(friendRespository.findFriendRequestById(friendRequestAccept.getFriendRequestId()));

        if (optionalFriendRequest.isPresent()) {
            FriendRequest friendRequest = optionalFriendRequest.get();

            Optional<User> SenderOp = Optional.ofNullable(friendRequest.getSender());
            Optional<User> ReceiverOp = Optional.ofNullable(friendRequest.getReceiver());

            if (SenderOp.isPresent() && ReceiverOp.isPresent()) {

                User sender = SenderOp.get();
                User receiver = ReceiverOp.get();


                if (sender.getFriends().contains(receiver)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Users are already friends");
                }


                if (friendRequestAccept.isAccepted()) {

                    friendRespository.deleteFriendRequest(friendRequest.getId());

                    try {
                        sender.addFriend(receiver);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }

                    return ResponseEntity.status(HttpStatus.OK).body("Friend request accepted");

                } else {
                    friendRespository.deleteFriendRequest(friendRequest.getId());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User did not accept the Friend Request" +
                            " you sent");
                }

            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't find any users assigned to that " +
                        "friend Request");
            }

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't find any friend Request with that id");

        }
    }


}
