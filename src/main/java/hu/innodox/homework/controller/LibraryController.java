package hu.innodox.homework.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hu.innodox.homework.dto.BorrowDTO;
import hu.innodox.homework.model.Book;
import hu.innodox.homework.model.User;
import hu.innodox.homework.repository.BookRepository;
import hu.innodox.homework.repository.UserRepository;

@RestController
public class LibraryController {
	
	@Autowired
	BookRepository bookRepository;
	
	@Autowired
	UserRepository userRepository;

	/**
	 * 
	 * @return A kolcsonozheto konyvek listaja
	 */
	@RequestMapping(value="/book", method=RequestMethod.GET)
	public Iterable<Book> getBook() {
		Iterable<Book> books = this.bookRepository.findAllAvailable();
		return books;
	}

	/**
	 * 
	 * @param email
	 * @return a parameterkent kapott email cimhez tartozo konyv lista
	 */
	@RequestMapping(value="/book/{email}", method=RequestMethod.GET)
	public Iterable<Book> getBook(@PathVariable String email) {
		Optional<User> user = this.userRepository.findByEmail(email);
		Iterable<Book> books = this.bookRepository.findAllByUsers(user.get());
		return books;
	}
	
	/**
	 * Uj konyv hozzaadasa
	 * @param book
	 */
	@RequestMapping(value="/book", method=RequestMethod.POST)
	public void postBook(@RequestBody Book book) {
		System.out.println("book: "+ book.getTitle());
		this.bookRepository.save(book);
	}
	
	/**
	 * az adott email cimhez hozzarendel egy konyv peldanyt
	 * @param borrowDTO
	 */
	@RequestMapping(value="/borrow", method=RequestMethod.POST)
	public void borrowBook(@RequestBody BorrowDTO borrowDTO) {
		Optional<User> user = this.userRepository.findByEmail(borrowDTO.getEmail());
		Optional<Book> book = this.bookRepository.findById(borrowDTO.getBookId());
		System.out.println("book: "+ book.get().getTitle());
		book.get().setQuantity(book.get().getQuantity()-1);
		user.get().getBooks().add(book.get());
		this.userRepository.save(user.get());
	}
	
	/**
	 * az adott email cimtol elveszi az adott konyvet
	 * @param borrowDTO
	 */
	@RequestMapping(value="/restore", method=RequestMethod.POST)
	public void restoreBook(@RequestBody BorrowDTO borrowDTO) {
		Optional<User> user = this.userRepository.findByEmail(borrowDTO.getEmail());
		Optional<Book> book = this.bookRepository.findById(borrowDTO.getBookId());
		System.out.println("book: "+ book.get().getTitle());
		book.get().setQuantity(book.get().getQuantity()+1);
		user.get().getBooks().remove(book);
		this.userRepository.save(user.get());
	}
	
}
