package abp2.apb2_api.api;

import abp2.apb2_api.model.Statue;
import abp2.apb2_api.service.StatueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StatueController {
    @Autowired
    private StatueService statueService;

    @GetMapping("/statues")
    public ResponseEntity<?> getAllStatues() {
        return this.statueService.getAllStatues();
    }

    @GetMapping("/statue/{id}")
    public ResponseEntity<?> getStatueById(@PathVariable int id) {
        return this.statueService.getStatueById(id);

    }

    @PostMapping("/statue")
    public ResponseEntity<?> createStatue(@RequestBody Statue statue) {

        return this.statueService.insertStatue(statue);
    }

    @PostMapping("/statues")
    public ResponseEntity<?> createStatues(@RequestBody Statue[] statues) {
        return this.statueService.insertStatueArray(statues);
    }

    @PutMapping("/statue/{id}")
    public ResponseEntity<?> updateStatue(@PathVariable int id, @RequestBody Statue statue) {
        return this.statueService.updateStatue(id, statue);
    }

    @DeleteMapping("/statue/{id}")
    public ResponseEntity<?> deleteStatue(@PathVariable int id) {
        return this.statueService.deleteStatue(id);

    }

}
