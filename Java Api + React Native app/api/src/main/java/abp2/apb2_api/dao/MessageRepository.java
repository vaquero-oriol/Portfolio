package abp2.apb2_api.dao;

import abp2.apb2_api.model.Message;
import abp2.apb2_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderAndReceiverOrSenderAndReceiver(User sender, User receiver, User receiver2, User sender2);

    @Modifying
    @Query("DELETE FROM Message m WHERE m.id = :messageId")
    void deleteMessageById(@Param("messageId") Long messageId);
}


