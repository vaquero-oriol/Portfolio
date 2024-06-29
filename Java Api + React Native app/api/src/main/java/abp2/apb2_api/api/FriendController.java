package abp2.apb2_api.api;

import abp2.apb2_api.model.FriendRequestAccept;
import abp2.apb2_api.model.FriendRequestData;
import abp2.apb2_api.model.FriendRequestAccept;
import abp2.apb2_api.model.User;
import abp2.apb2_api.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class FriendController {
    @Autowired
    private FriendRequestService friendRequestService;

    @GetMapping("/friend-requests/{id}")
    public ResponseEntity<?> getFriendRequests(@PathVariable long id) {
        return friendRequestService.getFriendRequest(id);
    }

    @DeleteMapping("/friend-request/{id}")
    public ResponseEntity<?> deleteFriendRequest(@PathVariable long id) {
        return friendRequestService.deleteFriendRequest(id);
    }

    @GetMapping("/friends/{id}")
    public ResponseEntity<?> getFriendsById(@PathVariable int id) {
        return friendRequestService.friendsById(id);
    }

    @GetMapping("/friends-progress/{id}")
    public ResponseEntity<?> getFriendsProgress(@PathVariable int id) {
        return friendRequestService.getFriendsProgress(id);
    }

    @PostMapping("/send-request")
    public ResponseEntity<?> sendFriendRequest(@RequestBody FriendRequestData friendRequestData) {
        return friendRequestService.sendFriendRequest(friendRequestData);
    }

    @PostMapping("/accept-request")
    public ResponseEntity<?> acceptFriendRequest(@RequestBody FriendRequestAccept friendRequestAccept){
        return friendRequestService.acceptFriendRequest(friendRequestAccept);
    }
}
