package hu.innodox.homework;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import hu.innodox.homework.model.User;
import hu.innodox.homework.repository.UserRepository;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String email = authentication.getName();
        String password = this.bCryptPasswordEncoder().encode(authentication.getCredentials().toString());

        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent() && !password.equals(this.bCryptPasswordEncoder().encode(user.get().getPassword()))) {
        	return null;
        }
        
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.get().getEmail())); // description is a string

        return new UsernamePasswordAuthenticationToken(email, password, authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}