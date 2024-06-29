package abp2.apb2_api.api;

import abp2.apb2_api.model.Profile;
import abp2.apb2_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile/{id}")
    private ResponseEntity<?> getProfile(@PathVariable int id) {
        return this.userService.getProfile(id);
    }

    @PutMapping("/profile/{id}")
    private ResponseEntity<?> updateProfile(@PathVariable int id, @RequestBody Profile profile) {
        return this.userService.updateProfile(id, profile);
    }

    @PostMapping("/profile-picture/{id}")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable int id,
                                                       @RequestParam("image") MultipartFile imageFile) {
        return this.userService.saveProfilePicture(id, imageFile);
    }

    @GetMapping("/progress/{id}")
    private ResponseEntity<?> getProgress(@PathVariable int id) {
        return this.userService.getProgress(id);
    }

    @GetMapping("/daily")
    private ResponseEntity<?> getDaily() {
        return this.userService.getDailyStatue();
    }

    @PostMapping("/addStatue")
    private ResponseEntity<?> addStatueToUser(@RequestParam int userId, @RequestParam int statueId) {
        return this.userService.addStatueToUser(userId, statueId);
    }

    @PutMapping("/updateTheme")
    private ResponseEntity<?> updateTheme(@RequestParam int userId, @RequestParam int themeId) {
        return userService.updateTheme(userId, themeId);
    }

    @PutMapping("/updateName")
    private ResponseEntity<?> updateName(@RequestParam int userId, @RequestParam String name ) {
        return userService.updateName(userId, name);
    }

    @DeleteMapping("/profile/{id}")
    private ResponseEntity<?> deleteProfile(@PathVariable int id) {
        return this.userService.deleteUser(id);
    }
}
