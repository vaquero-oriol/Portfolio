package abp2.apb2_api.dao;

import abp2.apb2_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SignUpRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT u.email, u.password FROM User u WHERE u.email=:email")
    User findByEmail(String email);
}
