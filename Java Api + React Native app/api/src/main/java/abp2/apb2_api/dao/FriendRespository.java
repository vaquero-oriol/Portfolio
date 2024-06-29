package abp2.apb2_api.dao;
import abp2.apb2_api.model.FriendRequest;
import abp2.apb2_api.model.Statue;
import abp2.apb2_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

public interface FriendRespository extends JpaRepository<FriendRequest, Long>  {

    @Query("SELECT u.friends FROM User u WHERE u.id = :userId")
    List<User> friendsByUserId(@Param("userId")int id);

    @Query("SELECT fr FROM FriendRequest fr WHERE fr.receiver = :user OR fr.sender = :user")
    List<FriendRequest> findByReceiverOrSender(@Param("user") User user);

    @Modifying
    @Query("DELETE FROM FriendRequest fr WHERE fr.id = :friendRequestId")
    void deleteFriendRequest(@Param("friendRequestId") long friendRequestId);

    @Query("SELECT fr FROM FriendRequest fr WHERE fr.id = :friendRequestId")
    FriendRequest findFriendRequestById(@Param("friendRequestId") long friendRequestId);



    }
