package Calendar.Repository;

import Calendar.Entity.ErrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ErrandRepository extends JpaRepository<ErrandEntity,String> {
}
