package com.vesna1010.bookservice.models;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import javax.imageio.ImageIO;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vesna1010.bookservice.enums.Language;

@Entity
@Table(name = "BOOKS")
public class Book {

	private Long id;
	private String title;
	private String isbn;
	private Language language;
	private Category category;
	private List<Author> authors = new ArrayList<>();
	private byte[] content;
	private String description;

	public Book() {
	}

	public Book(Long id, String title, String isbn, Language language, Category category, List<Author> authors,
			byte[] content, String description) {
		this.id = id;
		this.title = title;
		this.isbn = isbn;
		this.language = language;
		this.category = category;
		this.authors = authors;
		this.content = content;
		this.description = description;
	}

	@Id
	@GeneratedValue
	@Column(name = "ID", nullable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "TITLE", nullable = false)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "ISBN", nullable = false)
	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	@Enumerated(EnumType.STRING)
	@Column(name = "LANGUAGE", nullable = false)
	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID", nullable = false)
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@ManyToMany
	@JoinTable(
			name = "BOOKS_AUTHORS", 
			joinColumns = @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID", nullable = false), 
			inverseJoinColumns = @JoinColumn(name = "AUTHOR_ID", referencedColumnName = "ID", nullable = false))
	public List<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(List<Author> authors) {
		this.authors = authors;
	}

	@JsonIgnore
	@Lob
	@Column(name = "CONTENT", nullable = false)
	public byte[] getContent() {
		return content;
	}

	@JsonProperty
	public void setContent(byte[] content) {
		this.content = content;
	}

	@Column(name = "DESCRIPTION", nullable = true)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Transient
	public byte[] getImage() {
		PDDocument document;
		PDFRenderer renderer;
		ByteArrayOutputStream output;

		try {
			document = PDDocument.load(this.getContent());
			renderer = new PDFRenderer(document);
			output = new ByteArrayOutputStream();

			ImageIO.write(renderer.renderImage(0), "jpeg", output);

			return output.toByteArray();
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
