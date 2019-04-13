package hu.innodox.homework.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserConroller {
	

	@RequestMapping(value="/login", method=RequestMethod.PUT)
	public String login(String email, String password) {
		return "hello";
	}
}