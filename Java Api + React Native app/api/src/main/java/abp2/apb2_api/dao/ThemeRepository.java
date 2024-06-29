package abp2.apb2_api.dao;

import abp2.apb2_api.model.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ThemeRepository extends JpaRepository<Theme, Integer> {
    @Query("SELECT t FROM Theme t WHERE t.name = :name")
    Optional<Theme> findThemeByName(String name);
}
