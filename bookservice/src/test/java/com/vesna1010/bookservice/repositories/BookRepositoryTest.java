package com.vesna1010.bookservice.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import com.vesna1010.bookservice.enums.Language;
import com.vesna1010.bookservice.models.Author;
import com.vesna1010.bookservice.models.Book;
import com.vesna1010.bookservice.models.Category;

public class BookRepositoryTest extends BaseRepositoryTest {

	@Autowired
	private BookRepository bookRepository;

	@Test
	public void findAllTest() {
		Page<Book> page = bookRepository.findAll(PAGEABLE);
		List<Book> books = page.getContent();

		assertEquals(10, page.getSize());
		assertEquals(0, page.getNumber());
		assertEquals(1, page.getTotalPages());
		assertEquals(5, page.getNumberOfElements());
		assertEquals("Bookss A", books.get(0).getTitle());
		assertEquals("Title B", books.get(1).getTitle());
		assertEquals("BookS B", books.get(2).getTitle());
		assertEquals("Title C", books.get(3).getTitle());
		assertEquals("BookSS D", books.get(4).getTitle());
	}

	@Test
	public void findAllByCategoryIdTest() {
		Page<Book> page = bookRepository.findAllByCategoryId(1L, PAGEABLE);
		List<Book> books = page.getContent();

		assertEquals(10, page.getSize());
		assertEquals(0, page.getNumber());
		assertEquals(1, page.getTotalPages());
		assertEquals(3, books.size());
		assertEquals("Bookss A", books.get(0).getTitle());
		assertEquals("BookS B", books.get(1).getTitle());
		assertEquals("BookSS D", books.get(2).getTitle());
	}

	@Test
	public void findAllByTitleContainsTest() {
		Page<Book> page = bookRepository.findAllByTitleContains("Ks", PAGEABLE);
		List<Book> books = page.getContent();

		assertEquals(10, page.getSize());
		assertEquals(0, page.getNumber());
		assertEquals(1, page.getTotalPages());
		assertEquals(3, books.size());
		assertEquals("Bookss A", books.get(0).getTitle());
		assertEquals("BookS B", books.get(1).getTitle());
		assertEquals("BookSS D", books.get(2).getTitle());
	}

	@Test
	public void findAllByTitleContainsAndLanguageTest() {
		Page<Book> page = bookRepository.findAllByTitleContainsAndLanguage("Ks", Language.ENGLISH, PAGEABLE);
		List<Book> books = page.getContent();

		assertEquals(10, page.getSize());
		assertEquals(0, page.getNumber());
		assertEquals(1, page.getTotalPages());
		assertEquals(2, books.size());
		assertEquals("Bookss A", books.get(0).getTitle());
		assertEquals("BookS B", books.get(1).getTitle());
	}

	@Test
	public void findByIdTest() {
		Optional<Book> optional = bookRepository.findById(1L);
		Book book = optional.get();

		assertEquals("Bookss A", book.getTitle());
		assertEquals(2, book.getAuthors().size());
	}

	@Test
	public void findByIdNotFoundTest() {
		Optional<Book> optional = bookRepository.findById(6L);

		assertFalse(optional.isPresent());
	}

	@Test
	public void saveTest() {
		Book book = new Book(null, "Book", "175-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category A", "Description"),
				Arrays.asList(new Author(1L, "Author A", "authorA@gmail.com", "Description")), getContent(),
				"Description");

		book = bookRepository.save(book);

		assertNotNull(book.getId());
	}

	private byte[] getContent() {
		byte[] content = null;
		File file = null;
		InputStream inputStream = null;

		try {
			file = new File("C:\\Users\\Vesna\\angular\\bookservice\\src\\test\\resources\\codeconventions.pdf");
			inputStream = new FileInputStream(file);
			content = new byte[(int) file.length()];
			inputStream.read(content);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				inputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return content;
	}

	@Test
	public void existsByIdTest() {
		assertTrue(bookRepository.existsById(1L));
		assertFalse(bookRepository.existsById(6L));
	}

	@Test
	public void deleteByIdTest() {
		bookRepository.deleteById(1L);

		assertFalse(bookRepository.existsById(1L));
	}
}
