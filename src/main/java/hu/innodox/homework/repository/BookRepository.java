package hu.innodox.homework.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import hu.innodox.homework.model.Book;
import hu.innodox.homework.model.User;

public interface BookRepository extends CrudRepository<Book, Long> {
	
	/**
	 * 
	 * @param user
	 * @return az adott user kolcsonzott konyvei
	 */
	Iterable<Book> findAllByUsers( User user );
	
	/**
	 * @return a kolcsonozheto konyvesk listaja
	 */
	@Query("select b from Book b where b.quantity >= 1")
	Iterable<Book> findAllAvailable();
}