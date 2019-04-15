package hu.innodox.homework.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hu.innodox.homework.dto.LoginDTO;
import hu.innodox.homework.model.User;
import hu.innodox.homework.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class UserConroller {
	
	@Autowired
	UserRepository userRepository;

	@RequestMapping(value="/login", method=RequestMethod.POST)
	public User login(@RequestBody LoginDTO loginDTO) {
		Optional<User> user = this.userRepository.findByEmail(loginDTO.getEmail());
		return user.get();
	}
}