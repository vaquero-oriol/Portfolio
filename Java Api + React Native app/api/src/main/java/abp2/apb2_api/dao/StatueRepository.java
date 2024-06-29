package abp2.apb2_api.dao;

import abp2.apb2_api.model.Statue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatueRepository extends JpaRepository<Statue, Integer> {
}

