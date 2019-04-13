package hu.innodox.homework.model;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Kolcsonozheto konyvek
 * @author zolika
 *
 */
@Valid
@Entity
@Table(name = "BOOK", uniqueConstraints={
	    @UniqueConstraint(columnNames = {"title", "authors"})
	}) 
public class Book {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	@Column(name = "ID", unique = true, nullable = false)
	private Long id;
	
	/**
	 * cim
	 */
	@NotBlank
	@Column(name = "TITLE", length=100)
    private String title;

	/**
	 * szerzo
	 */
    @Column(name = "AUTHORS", length=256)
    private String authors;

    /**
     * kiado
     */
    @Column(name = "PUBLISHER", length=100)
    private String publisher;

    /**
     * kategoria
     */
    @Column(name = "CATEGORY")
    private String category;

    /**
     * eloszo
     */
    @Column(name = "PREFACE", length=200)
    private String preface;
    
    /**
     * tartalom
     */
    @Column(name = "CONTENT", length=5000)
    private String content;
    
    /**
     * elerheto mennyiseg
     */
    @Column(name = "QUANTITY")
    private Long quantity;
    
    @JsonIgnore
    @ManyToMany(mappedBy = "books")
    private Collection<User> users;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthors() {
		return authors;
	}

	public void setAuthors(String authors) {
		this.authors = authors;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPreface() {
		return preface;
	}

	public void setPreface(String preface) {
		this.preface = preface;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Collection<User> getUsers() {
		return users;
	}

	public void setUsers(Collection<User> users) {
		this.users = users;
	}
	
}
