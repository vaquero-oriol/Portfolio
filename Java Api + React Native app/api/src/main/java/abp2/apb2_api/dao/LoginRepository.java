package abp2.apb2_api.dao;

import abp2.apb2_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoginRepository extends JpaRepository<User, Integer> {
    @Query(value="SELECT u FROM User u WHERE u.email=?1 AND u.password=?2")
    User findByEmailAndPassword(String email, String password);

}
