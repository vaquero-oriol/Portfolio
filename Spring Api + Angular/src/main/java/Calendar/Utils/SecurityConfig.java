package Calendar.Utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/users/createUser").permitAll()
                        .requestMatchers("/users/login").permitAll()
                        .requestMatchers("/users/name").permitAll()
                        .requestMatchers("/notes/createnote").permitAll()
                        .requestMatchers("/notes/getnote").permitAll()
                        .requestMatchers("/notes/updatenote").permitAll()
                        .requestMatchers("/notes/getallnotes").permitAll()
                        .requestMatchers("/notes/uploadimage").permitAll()
                        .requestMatchers("/notes/uploadaudio").permitAll()





                        .anyRequest().authenticated()
                )
                .httpBasic(withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
