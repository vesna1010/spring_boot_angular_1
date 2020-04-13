package com.vesna1010.bookservice.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import com.vesna1010.bookservice.enums.Language;
import com.vesna1010.bookservice.models.Author;
import com.vesna1010.bookservice.models.Book;
import com.vesna1010.bookservice.models.Category;
import com.vesna1010.bookservice.repositories.BookRepository;

public class BookServiceTest extends BaseServiceTest {

	@Autowired
	private BookService bookService;
	@MockBean
	private BookRepository bookRepository;

	@Test
	public void findAllBooksTest() {
		Page<Book> page = new PageImpl<Book>(Arrays.asList(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description"),
				new Book(2L, "Book B", "974-1-4842-3197-5", Language.ENGLISH,
						new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description")),
				PAGEABLE, 2);

		when(bookRepository.findAll(PAGEABLE)).thenReturn(page);

		Page<Book> pageDb = bookService.findAllBooks(PAGEABLE);
		List<Book> booksDb = page.getContent();

		assertEquals(1, pageDb.getTotalPages());
		assertEquals(0, pageDb.getNumber());
		assertEquals(10, pageDb.getSize());
		assertEquals(2, pageDb.getNumberOfElements());

		assertEquals("Book A", booksDb.get(0).getTitle());
		assertEquals("Book B", booksDb.get(1).getTitle());
		verify(bookRepository, times(1)).findAll(PAGEABLE);
	}

	@Test
	public void findAllBooksByCategoryIdTest() {
		Page<Book> page = new PageImpl<Book>(Arrays.asList(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description"),
				new Book(2L, "Book B", "974-1-4842-3197-5", Language.ENGLISH,
						new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description")),
				PAGEABLE, 2);

		when(bookRepository.findAllByCategoryId(1L, PAGEABLE)).thenReturn(page);

		Page<Book> pageDb = bookService.findAllBooksByCategoryId(1L, PAGEABLE);
		List<Book> booksDb = page.getContent();

		assertEquals(1, pageDb.getTotalPages());
		assertEquals(0, pageDb.getNumber());
		assertEquals(10, pageDb.getSize());
		assertEquals(2, pageDb.getNumberOfElements());

		assertEquals("Book A", booksDb.get(0).getTitle());
		assertEquals("Book B", booksDb.get(1).getTitle());
		verify(bookRepository, times(1)).findAllByCategoryId(1L, PAGEABLE);
	}

	@Test
	public void findAllBooksByTitleTest() {
		Page<Book> page = new PageImpl<Book>(Arrays.asList(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description"),
				new Book(2L, "Book B", "974-1-4842-3197-5", Language.ENGLISH,
						new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description")),
				PAGEABLE, 2);

		when(bookRepository.findAllByTitleContains("Book", PAGEABLE)).thenReturn(page);

		Page<Book> pageDb = bookService.findAllBooksByTitle("Book", PAGEABLE);
		List<Book> booksDb = page.getContent();

		assertEquals(1, pageDb.getTotalPages());
		assertEquals(0, pageDb.getNumber());
		assertEquals(10, pageDb.getSize());
		assertEquals(2, pageDb.getNumberOfElements());

		assertEquals("Book A", booksDb.get(0).getTitle());
		assertEquals("Book B", booksDb.get(1).getTitle());
		verify(bookRepository, times(1)).findAllByTitleContains("Book", PAGEABLE);
	}

	@Test
	public void findAllBooksByTitleAndLanguageTest() {
		Page<Book> page = new PageImpl<Book>(Arrays.asList(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description"),
				new Book(2L, "Book B", "974-1-4842-3197-5", Language.ENGLISH,
						new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description")),
				PAGEABLE, 2);

		when(bookRepository.findAllByTitleContainsAndLanguage("Book", Language.ENGLISH, PAGEABLE)).thenReturn(page);

		Page<Book> pageDb = bookService.findAllBooksByTitleAndLanguage("Book", Language.ENGLISH, PAGEABLE);
		List<Book> booksDb = page.getContent();

		assertEquals(1, pageDb.getTotalPages());
		assertEquals(0, pageDb.getNumber());
		assertEquals(10, pageDb.getSize());
		assertEquals(2, pageDb.getNumberOfElements());

		assertEquals("Book A", booksDb.get(0).getTitle());
		assertEquals("Book B", booksDb.get(1).getTitle());
		verify(bookRepository, times(1)).findAllByTitleContainsAndLanguage("Book", Language.ENGLISH, PAGEABLE);
	}

	@Test
	public void findBookByIdTest() {
		Optional<Book> optional = Optional.of(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
				"Description"));

		when(bookRepository.findById(1L)).thenReturn(optional);

		Book bookDb = bookService.findBookById(1L);

		assertEquals("Book A", bookDb.getTitle());
		verify(bookRepository, times(1)).findById(1L);
	}

	@Test
	public void findBookByIdExceptionTest() {
		Optional<Book> optional = Optional.empty();

		when(bookRepository.findById(1L)).thenReturn(optional);

		assertThrows(RuntimeException.class, () -> bookService.findBookById(1L));

		verify(bookRepository, times(1)).findById(1L);
	}

	@Test
	public void saveBookTest() {
		Book book = new Book(null, "Book", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description");

		when(bookRepository.save(book)).thenReturn(
				new Book(1L, "Book", "975-1-4842-3197-5", Language.ENGLISH, new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description"));

		Book bookDb = bookService.saveBook(book);

		assertEquals(1, bookDb.getId());
		verify(bookRepository, times(1)).save(book);
	}

	@Test
	public void updateBookTest() {
		Book book = new Book(1L, "Book", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description");

		when(bookRepository.existsById(1L)).thenReturn(true);
		when(bookRepository.save(book)).thenReturn(book);

		Book bookDb = bookService.updateBook(book, 1L);

		assertEquals(bookDb, book);
		verify(bookRepository, times(1)).existsById(1L);
		verify(bookRepository, times(1)).save(book);
	}

	@Test
	public void updateBookExceptionTest() {
		Book book = new Book(1L, "Book", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description");

		when(bookRepository.existsById(1L)).thenReturn(false);
		when(bookRepository.save(book)).thenReturn(book);

		assertThrows(RuntimeException.class, () -> bookService.updateBook(book, 1L));

		verify(bookRepository, times(1)).existsById(1L);
		verify(bookRepository, never()).save(book);
	}

	@Test
	public void deleteBookByIdTest() {
		when(bookRepository.existsById(1L)).thenReturn(true);
		doNothing().when(bookRepository).deleteById(1L);

		bookService.deleteBookById(1L);

		verify(bookRepository, times(1)).existsById(1L);
		verify(bookRepository, times(1)).deleteById(1L);
	}

	@Test
	public void deleteBookByIdExceptionTest() {
		when(bookRepository.existsById(1L)).thenReturn(false);
		doNothing().when(bookRepository).deleteById(1L);

		assertThrows(RuntimeException.class, () -> bookService.deleteBookById(1L));

		verify(bookRepository, times(1)).existsById(1L);
		verify(bookRepository, never()).deleteById(1L);
	}

}
