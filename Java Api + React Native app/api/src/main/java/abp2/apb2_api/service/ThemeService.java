package abp2.apb2_api.service;

import abp2.apb2_api.dao.ThemeRepository;
import abp2.apb2_api.model.Theme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ThemeService {
    @Autowired
    ThemeRepository repository;

    public ResponseEntity<?> addTheme(Theme theme) {
        if (theme == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid theme data provided");
        }
        try {
            repository.save(theme);
            return ResponseEntity.status(HttpStatus.OK).body("Theme added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error\n" + e);
        }
    }

    public ResponseEntity<?> addMultipleThemes(Theme[] themes) {
        if (themes == null || themes.length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid themes data provided");
        }
        List<Theme> uniqueThemes = new ArrayList<>();
        for (Theme t : themes) {
            if (repository.findThemeByName(t.getName()).isEmpty()) {
                uniqueThemes.add(t);
            }
        }
        try {
            repository.saveAll(uniqueThemes);
            return ResponseEntity.status(HttpStatus.OK).body("Themes added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error\n" + e);
        }
    }

    public ResponseEntity<?> getAllThemes() {
        List<Theme> themes = repository.findAll();
        if (!themes.isEmpty()) {
            return ResponseEntity.ok(themes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> getThemeById(int id) {
        Optional<Theme> theme = repository.findById(id);
        if (theme.isPresent()) {
            return ResponseEntity.ok().body(theme);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> deleteTheme(int id) {
        if (id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid id provided. ID: " + id);
        }
        try {
            repository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Themes deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error\n" + e);
        }
    }
}
