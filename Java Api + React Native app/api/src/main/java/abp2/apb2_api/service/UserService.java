package abp2.apb2_api.service;

import abp2.apb2_api.dao.FriendRespository;
import abp2.apb2_api.dao.StatueRepository;
import abp2.apb2_api.dao.ThemeRepository;
import abp2.apb2_api.dao.UserRepository;
import abp2.apb2_api.model.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StatueRepository statueRepository;
    @Autowired
    private FriendRespository friendRespository;
    @Autowired
    private ThemeRepository themeRepository;

    public ResponseEntity<?> getProfile(int id) {
        if (id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ID provided: " + id);
        }
        Optional<User> user = this.userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(new Profile(user.get().getName(), user.get().getEmail()
                    , user.get().getTheme(), user.get().getImage()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> updateProfile(int id, Profile profile) {
        if (id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ID provided: " + id);
        }
        if (profile == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user data provided");
        }
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User could not be found");
        }
        try {
            user.get().updateProfile(profile);
            userRepository.save(user.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile. Please try" +
                    " again later.\n" + e);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Profile updated successfully");
    }

    public ResponseEntity<?> getProgress(int userId) {

        int userStatues = userRepository.countUserStatues(userId);
        long totalStatues = userRepository.count();

        long progress = (userStatues * 100L) / totalStatues;
        return ResponseEntity.ok().body(progress);
    }

    public ResponseEntity<?> getDailyStatue() {
        long totalStatues = userRepository.count();
        int dailyId = (int) (Math.random() * totalStatues + 1);

        Optional<Statue> dailyStatue = statueRepository.findById(dailyId);

        if (dailyStatue.isPresent()) {
            return ResponseEntity.ok().body(dailyStatue);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> addStatueToUser(int userId, int statueId) {
        if (userId <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ID provided: " + userId);
        }
        if (statueId <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ID provided: " + statueId);
        }
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User could not be found");
        }
        Optional<Statue> statue = statueRepository.findById(statueId);
        if (statue.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Statue could not be found");
        }
        try {
            user.get().addStatue(statue.get());
            userRepository.save(user.get());
            return ResponseEntity.status(HttpStatus.OK).body("Statue added to user successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error. Try again " +
                    "later\n" + e);
        }
    }

    @Transactional
    public ResponseEntity<?> deleteUser(int userId) {
        if (userId == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User id is 0");
        }

        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User userToDelete = userOptional.get();

            try {
                // Eliminar amigos
                for (User friend : userToDelete.getFriends()) {
                    userToDelete.removeFriend(friend);
                }

                // Eliminar estatuas
                for (Statue statue : userToDelete.getStatues()) {
                    userToDelete.removeStatue(statue);
                }

                Set<FriendRequest> friendRequestsToDelete = userRepository.findAllFriendRequestsByUserId(userId);
                for (FriendRequest friendRequest : friendRequestsToDelete) {
                    friendRespository.deleteFriendRequest(friendRequest.getId());
                }


                userRepository.delete(userToDelete);

                return ResponseEntity.status(HttpStatus.OK).body("User deleted correctly");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("An error occurred while deleting user with id: " + userId);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Couldn't find user with id: " + userId);
        }
    }

    public ResponseEntity<?> updateName(int userId, String name) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User could not be found");
        }
        try {
            user.get().setName(name);
            userRepository.save(user.get());
            return ResponseEntity.status(HttpStatus.OK).body("Name uploaded correctly");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error.\n" + e);
        }
    }

    public ResponseEntity<String> saveProfilePicture(int userId, MultipartFile imageFile) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User could not be found");
        }
        try {
            user.get().setImage(imageFile.getBytes());
            userRepository.save(user.get());
            return ResponseEntity.status(HttpStatus.OK).body("Profile picture uploaded correctly");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<?> updateTheme(int userId, int themeId) {
        if (userId <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect user id provided. ID: " + userId);
        }
        if (themeId <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect theme id provided. ID: " + themeId);
        }
        Optional<Theme> theme = themeRepository.findById(themeId);
        if (theme.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Theme could not be found");
        }
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User could not be found");
        }
        try {
            user.get().setTheme(theme.get());
            userRepository.save(user.get());
            return ResponseEntity.status(HttpStatus.OK).body("Theme added to user successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error.\n" + e);
        }
    }
}
