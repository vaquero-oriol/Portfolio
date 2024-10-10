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

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public Result<NotesEntity>UpdateNote(NotesRequest notesRequest){

        if(notesRequest.getId()<=0){
           return  Result.Failure("El id no es valido");
        }
        NotesEntity note= notesRepository.findNotesById(notesRequest.getId());
        if(note ==null){
            return Result.Failure("Note was not found");
        }
        note.setName(notesRequest.getName());
        note.setContent(notesRequest.getContent());

        notesRepository.save(note);

        return Result.Success(note);
    }
    public Result<ArrayList<NotesEntity>> getNotesByText(int userId,String text){
        if(userId<=0){
            return Result.Failure("El id no es valido");
        }
        ArrayList<NotesEntity>notesfromUser=notesRepository.FindNotesByUser(userId);
        ArrayList<NotesEntity>NotesFiltered= new ArrayList<>();
      for(NotesEntity note: notesfromUser){
        if(note.getContent().contains(text)){
            NotesFiltered.add(note);
        }

      }
      if(NotesFiltered.isEmpty()){
          return Result.Failure("No notes were found with that text");
      }
      return Result.Success(NotesFiltered);
    }
    public Result<ArrayList<NotesEntity>> GetAllNotes(int userId){
        if(userId<=0){
            Result.Failure("Cant find the user");
        }
        ArrayList<NotesEntity> AllNotes= notesRepository.FindNotesByUser(userId);

        if(AllNotes.isEmpty()){
            return Result.Failure("You have no notes available");
        }

        return Result.Success(AllNotes);
    }
}
