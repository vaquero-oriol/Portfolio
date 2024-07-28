package Calendar.Controller;

import Calendar.Entity.NotesEntity;
import Calendar.Entity.Request.NotesRequest;
import Calendar.Entity.UserEntity;
import Calendar.Repository.NotesRepository;
import Calendar.Service.NotesService;
import Calendar.Utils.Result;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notes")
public class NotesController {

    private final NotesService notesService;



    @Autowired
    public NotesController(NotesService notesService){this.notesService=notesService;}


    @PostMapping("/createnote")
    public ResponseEntity<?> createNote(@RequestParam int id){
        Result<NotesEntity> note=notesService.createNote(id);
        if(note.isSucces()){
            return ResponseEntity.ok(note.getValue());
        }else{
            return ResponseEntity.badRequest().body(note.getError());
        }
    }

    @GetMapping("/getnote")
    public ResponseEntity<?>GetNote(@RequestParam int id){
        Result<NotesEntity>note=notesService.OpenNote(id);
        if(note.isSucces()){
            return ResponseEntity.ok(note.getValue());
        }else{
            return ResponseEntity.badRequest().body(note.getError());
        }
    }
}
