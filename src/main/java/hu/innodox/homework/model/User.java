package hu.innodox.homework.model;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 *  Felhasznalok
 * @author zolik
 *
 */
@Entity
@Table(name = "USER")
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	@Column(name = "ID", unique = true, nullable = false)
	private Long id;
	
	/**
	 * Utonev
	 */
	@Column(name = "FIRST_NAME", length=60)
    private String firstName;

	/**
	 * Vezeteknev
	 */
    @Column(name = "LAST_NAME", length=60)
    private String lastName;

    /**
     * email cim
     */
    @Column(name = "EMAIL", length=100)
    private String email;

    /**
     * jelszo
     */
    @Column(name = "PASSWORD", length=20)
    private String password;
    
    /**
     * aktiv-e a felhasznalo
     */
    @Column(name = "IS_ACTIVE")
    private boolean isActive;
    
    /**
     * Kolcsonzott konyvek
     */
    @ManyToMany
    @JoinTable( 
        name = "users_books", 
        joinColumns = @JoinColumn(
          name = "user_id", referencedColumnName = "id"), 
        inverseJoinColumns = @JoinColumn(
          name = "book_id", referencedColumnName = "id")) 
    private Collection<Book> books;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	public Collection<Book> getBooks() {
		return books;
	}

	public void setBooks(Collection<Book> books) {
		this.books = books;
	}
}
