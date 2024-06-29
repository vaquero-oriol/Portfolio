package abp2.apb2_api.service;

import abp2.apb2_api.dao.StatueRepository;
import abp2.apb2_api.model.Statue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class StatueService {
    @Autowired
    private StatueRepository statueRepository;

    public ResponseEntity<?> getAllStatues() {
        List<Statue> allStatues = statueRepository.findAll();
        if (!allStatues.isEmpty()) {
            return ResponseEntity.ok(allStatues);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> getStatueById(int id) {
        Optional<Statue> statue = statueRepository.findById(id);
        if (statue.isPresent()) {
            return ResponseEntity.ok().body(statue);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> insertStatue(Statue statue) {
        if (statue == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid statue data provided");
        }
        try {
            statueRepository.save(statue);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create statue. Please try " +
                    "again later.\n" + e);
        }
        return ResponseEntity.ok("Statue inserted successfully");
    }

    public ResponseEntity<?> insertStatueArray(Statue[] statues) {
        if (statues == null || statues.length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid statues data provided");
        }
        try {
            statueRepository.saveAll(Arrays.asList(statues));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create statues. Please try " +
                    "again later.\n" + e);
        }
        return ResponseEntity.ok("Statues inserted successfully");
    }

    public ResponseEntity<?> updateStatue(int id, Statue statue) {
        if (statue == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid statue data provided");
        }
        if (id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ID provided: " + id);
        }
        statue.setId(id);
        try {
            statueRepository.save(statue);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update statue. Please try " +
                    "again later.\n" + e);
        }
        return ResponseEntity.ok("Statue updated successfully");
    }

    public ResponseEntity<?> deleteStatue(int id) {
        if (id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ID provided: " + id);
        }
        try {
            statueRepository.deleteById(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete statue. Please try " +
                    "again later.\n" + e);
        }
        return ResponseEntity.ok("Statue deleted successfully");
    }
}
