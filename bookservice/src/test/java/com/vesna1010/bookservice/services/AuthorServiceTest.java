package com.vesna1010.bookservice.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import java.util.ArrayList;
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
import com.vesna1010.bookservice.repositories.AuthorRepository;
import com.vesna1010.bookservice.repositories.BookRepository;

public class AuthorServiceTest extends BaseServiceTest {

	@Autowired
	private AuthorService authorService;
	@MockBean
	private AuthorRepository authorRepository;
	@MockBean
	private BookRepository bookRepository;

	@Test
	public void findAllAuthorsBySortTest() {
		List<Author> authors = Arrays.asList(new Author(1L, "Author A", "authorA@gmail.com", "Description A"),
				new Author(2L, "Author B", "authorB@gmail.com", "Description B"));

		when(authorRepository.findAll(SORT)).thenReturn(authors);

		List<Author> authorsDb = authorService.findAllAuthors(SORT);

		assertEquals(2, authorsDb.size());
		assertEquals("Author A", authorsDb.get(0).getName());
		assertEquals("Author B", authorsDb.get(1).getName());
		verify(authorRepository, times(1)).findAll(SORT);
	}

	@Test
	public void findAllAuthorsByPageableTest() {
		Page<Author> page = new PageImpl<Author>(
				Arrays.asList(new Author(1L, "Author A", "authorA@gmail.com", "Description A"),
						new Author(2L, "Author B", "authorB@gmail.com", "Description B")),
				PAGEABLE, 2);

		when(authorRepository.findAll(PAGEABLE)).thenReturn(page);

		Page<Author> pageDb = authorService.findAllAuthors(PAGEABLE);
		List<Author> authorsDb = pageDb.getContent();

		assertEquals(1, pageDb.getTotalPages());
		assertEquals(0, pageDb.getNumber());
		assertEquals(10, pageDb.getSize());
		assertEquals(2, pageDb.getNumberOfElements());

		assertEquals("Author A", authorsDb.get(0).getName());
		assertEquals("Author B", authorsDb.get(1).getName());
		verify(authorRepository, times(1)).findAll(PAGEABLE);
	}

	@Test
	public void findAuthorByIdTest() {
		Optional<Author> optional = Optional.of(new Author(1L, "Author A", "authorA@gmail.com", "Description A"));

		when(authorRepository.findById(1L)).thenReturn(optional);

		Author authorDb = authorService.findAuthorById(1L);

		assertEquals("Author A", authorDb.getName());
		assertEquals("authorA@gmail.com", authorDb.getEmail());
		assertEquals("Description A", authorDb.getDescription());
		verify(authorRepository, times(1)).findById(1L);
	}

	@Test
	public void findAuthorByIdExceptionTest() {
		Optional<Author> optional = Optional.empty();

		when(authorRepository.findById(1L)).thenReturn(optional);

		assertThrows(RuntimeException.class, () -> authorService.findAuthorById(1L));

		verify(authorRepository, times(1)).findById(1L);
	}

	@Test
	public void saveAuthorTest() {
		Author author = new Author(null, "Author", "author@gmail.com", "Description");

		when(authorRepository.save(author)).thenReturn(new Author(1L, "Author", "author@gmail.com", "Description"));

		Author authorDb = authorService.saveAuthor(author);

		assertEquals(1, authorDb.getId());
		verify(authorRepository, times(1)).save(author);
	}

	@Test
	public void updateAuthorTest() {
		Author author = new Author(1L, "Author", "author@gmail.com", "Description");

		when(authorRepository.existsById(1L)).thenReturn(true);
		when(authorRepository.save(author)).thenReturn(author);

		Author authorDb = authorService.updateAuthor(author, 1L);

		assertEquals(authorDb, author);
		verify(authorRepository, times(1)).existsById(1L);
		verify(authorRepository, times(1)).save(author);
	}

	@Test
	public void updateAuthorExceptionTest() {
		Author author = new Author(1L, "Author", "author@gmail.com", "Description");

		when(authorRepository.existsById(1L)).thenReturn(false);
		when(authorRepository.save(author)).thenReturn(author);

		assertThrows(RuntimeException.class, () -> authorService.updateAuthor(author, 1L));

		verify(authorRepository, times(1)).existsById(1L);
		verify(authorRepository, never()).save(author);
	}

	@Test
	public void deleteAuthorAndBookTest() {
		Book book = new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				new ArrayList<Author>(Arrays.asList(new Author(1L, "Author A", "authorA@gmail.com", "Description A"))),
				new byte[0], "Description");

		Optional<Author> optional = Optional.of(new Author(1L, "Author A", "authorA@gmail.com", "Description A",
				new ArrayList<Book>(Arrays.asList(book))));

		when(authorRepository.findById(1L)).thenReturn(optional);
		doNothing().when(bookRepository).delete(book);
		doNothing().when(authorRepository).deleteById(1L);

		authorService.deleteAuthorById(1L);

		assertEquals(1, book.getAuthors().size());
		verify(authorRepository, times(1)).findById(1L);
		verify(bookRepository, times(1)).delete(book);
		verify(authorRepository, times(1)).deleteById(1L);
	}

	@Test
	public void deleteAuthorByIdTest() {
		Book book = new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				new ArrayList<Author>(Arrays.asList(new Author(1L, "Author A", "authorA@gmail.com", "Description A"),
						new Author(2L, "Author B", "authorB@gmail.com", "Description B"))),
				new byte[0], "Description");

		Optional<Author> optional = Optional.of(new Author(1L, "Author A", "authorA@gmail.com", "Description A",
				new ArrayList<Book>(Arrays.asList(book))));

		when(authorRepository.findById(1L)).thenReturn(optional);
		when(bookRepository.save(book)).thenReturn(book);
		doNothing().when(authorRepository).deleteById(1L);

		authorService.deleteAuthorById(1L);

		assertEquals(1, book.getAuthors().size());
		verify(authorRepository, times(1)).findById(1L);
		verify(bookRepository, times(1)).save(book);
		verify(authorRepository, times(1)).deleteById(1L);
	}

	@Test
	public void deleteAuthorByIdExceptionTest() {
		when(authorRepository.findById(1L)).thenThrow(new RuntimeException("No author with id 1"));
		doNothing().when(authorRepository).deleteById(1L);

		assertThrows(RuntimeException.class, () -> authorService.deleteAuthorById(1L));

		verify(authorRepository, times(1)).findById(1L);
		verify(authorRepository, never()).deleteById(1L);
	}

}
