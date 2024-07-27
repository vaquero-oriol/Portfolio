package Calendar.Repository;

import Calendar.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    @Query("SELECT u FROM UserEntity u WHERE u.Id = :userid")
    UserEntity findUserById(@Param("userid") int userid);

    @Query("SELECT u FROM UserEntity u WHERE u.name = :userName")
    UserEntity findUserByName(@Param("userName") String userName);

}
