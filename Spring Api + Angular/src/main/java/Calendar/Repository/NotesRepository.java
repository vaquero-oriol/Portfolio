package Calendar.Repository;

import Calendar.Entity.NotesEntity;
import Calendar.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotesRepository extends JpaRepository<NotesEntity, Integer> {
    @Query("SELECT u FROM NotesEntity u WHERE u.Id = :notesid")
    NotesEntity findNotesById(@Param("notesid") int notesid);





}
