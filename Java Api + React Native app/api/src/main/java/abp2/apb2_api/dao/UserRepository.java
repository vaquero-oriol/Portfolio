package abp2.apb2_api.dao;

import abp2.apb2_api.model.FriendRequest;
import abp2.apb2_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT COUNT(statues) FROM User u JOIN u.statues statues WHERE u.id = ?1")
    int countUserStatues(long userId);

    @Modifying
    @Query("DELETE FROM User u WHERE u.id = :userId")
    void deleteUserById(@Param("userId") int userId);

    @Query("SELECT fr FROM FriendRequest fr " +
            "WHERE fr.sender.id = :userId OR fr.receiver.id = :userId")
    Set<FriendRequest> findAllFriendRequestsByUserId(@Param("userId") int userId);


}
