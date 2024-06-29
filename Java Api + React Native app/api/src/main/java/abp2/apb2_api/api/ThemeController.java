package abp2.apb2_api.api;

import abp2.apb2_api.model.Theme;
import abp2.apb2_api.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ThemeController {
    @Autowired
    private ThemeService service;

    @PostMapping("/theme")
    private ResponseEntity<?> addTheme(@RequestBody Theme theme) {
        return service.addTheme(theme);
    }

    @PostMapping("/themes")
    private ResponseEntity<?> addMultipleThemes(@RequestBody Theme[] themes) {
        return service.addMultipleThemes(themes);
    }

    @GetMapping("/themes")
    private ResponseEntity<?> getAllThemes() {
        return service.getAllThemes();
    }

    @GetMapping("/theme/{id}")
    private ResponseEntity<?> getOneTheme(@PathVariable int id) {
        return service.getThemeById(id);
    }

    @DeleteMapping("/theme/{id}")
    private ResponseEntity<?> deleteTheme(@PathVariable int id) {
        return service.deleteTheme((id));
    }
}
