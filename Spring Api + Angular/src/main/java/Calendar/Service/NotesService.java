package Calendar.Service;

import Calendar.Entity.NotesEntity;
import Calendar.Entity.UserEntity;
import Calendar.Repository.NotesRepository;
import Calendar.Utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
public class NotesService {

    @Autowired
    private NotesRepository notesRepository;
    private final PasswordEncoder passwordEncoder;


    public NotesService(NotesRepository notesRepository,PasswordEncoder passwordEncoder) {
        this.notesRepository = notesRepository;
        this.passwordEncoder=passwordEncoder;
    }
    public Result<NotesEntity> createNote(UserEntity user){

        NotesEntity note= new NotesEntity();

        note.setCreationDate(new Date());
        note.setUser(user);


        return Result.Succes(note);
    }

    public Result<NotesEntity> OpenNote(int id){
        if(id<=0){
            Result.Failure("Id is not valid");
        }
        NotesEntity note=notesRepository.findNotesById(id);

            if(note==null){
                Result.Failure("No se ha podido encontrar la nota");
            }
          return  Result.Succes(note);
    }
}
