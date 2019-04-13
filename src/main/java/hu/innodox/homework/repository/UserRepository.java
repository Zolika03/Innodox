package hu.innodox.homework.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import hu.innodox.homework.model.User;

public interface UserRepository extends CrudRepository<User, Long> {

	/**
	 * a parameterenkent kapott email cimre megkeresi az adott felhasznalot
	 * @param email
	 * @return az email cimhez tartozo felhasznalo
	 */
	Optional<User> findByEmail( String email );
	
}
