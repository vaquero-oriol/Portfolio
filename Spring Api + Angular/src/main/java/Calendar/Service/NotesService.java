package Calendar.Service;

import Calendar.Entity.NotesEntity;
import Calendar.Entity.Request.NotesRequest;
import Calendar.Entity.UserEntity;
import Calendar.Repository.NotesRepository;
import Calendar.Repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public NotesService(NotesRepository notesRepository,PasswordEncoder passwordEncoder) {
        this.notesRepository = notesRepository;
        this.passwordEncoder=passwordEncoder;
    }
    public Result<NotesEntity> createNote(int id){

        UserEntity validUser= userRepository.findUserById(id);

        if(validUser ==null){
            Result.Failure("User does not Exist");
        }

        NotesEntity note= new NotesEntity();

        note.setName("Note "+note.getId());

        note.setCreationDate(new Date());
        note.setUser(validUser);

        notesRepository.save(note);
        return Result.Success(note);
    }

    public Result<NotesEntity> OpenNote(int id){
        if(id<=0){
          return   Result.Failure("Id is not valid");
        }
        NotesEntity note=notesRepository.findNotesById(id);

            if(note==null){
              return   Result.Failure("No se ha podido encontrar la nota");
            }
          return  Result.Success(note);
    }
}
