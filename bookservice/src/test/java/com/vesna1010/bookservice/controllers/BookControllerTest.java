package com.vesna1010.bookservice.controllers;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.Arrays;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import com.vesna1010.bookservice.enums.Language;
import com.vesna1010.bookservice.models.Author;
import com.vesna1010.bookservice.models.Book;
import com.vesna1010.bookservice.models.Category;
import com.vesna1010.bookservice.services.BookService;

public class BookControllerTest extends BaseControllerTest {

	@MockBean
	private BookService bookService;

	@Test
	public void findAllBooksTest() throws Exception {
		Page<Book> page = new PageImpl<Book>(Arrays.asList(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description"),
				new Book(2L, "Book B", "974-1-4842-3197-5", Language.ENGLISH,
						new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description")),
				PAGEABLE, 2);

		when(bookService.findAllBooks(PAGEABLE)).thenReturn(page);

		mockMvc.perform(get("/books"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.totalPages", is(1)))
			   .andExpect(jsonPath("$.number", is(0)))
			   .andExpect(jsonPath("$.size", is(10)))
			   .andExpect(jsonPath("$.numberOfElements", is(2)))
			   .andExpect(jsonPath("$.content[0].title", is("Book A")))
			   .andExpect(jsonPath("$.content[1].title", is("Book B")));

		verify(bookService, times(1)).findAllBooks(PAGEABLE);
	}
	
	@Test
	public void findAllBooksByCategoryId() throws Exception {
		Page<Book> page = new PageImpl<Book>(Arrays.asList(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description"),
				new Book(2L, "Book B", "974-1-4842-3197-5", Language.ENGLISH,
						new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description")),
				PAGEABLE, 2);

		when(bookService.findAllBooksByCategoryId(1L, PAGEABLE)).thenReturn(page);
		
		mockMvc.perform(
				get("/books")
				.param("categoryId", "1")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.totalPages", is(1)))
			   .andExpect(jsonPath("$.number", is(0)))
			   .andExpect(jsonPath("$.size", is(10)))
			   .andExpect(jsonPath("$.numberOfElements", is(2)))
			   .andExpect(jsonPath("$.content[0].title", is("Book A")))
			   .andExpect(jsonPath("$.content[1].title", is("Book B")));

		verify(bookService, times(1)).findAllBooksByCategoryId(1L, PAGEABLE);
	}
	
	@Test
	public void findAllBooksByTitle() throws Exception {
		Page<Book> page = new PageImpl<Book>(Arrays.asList(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description"),
				new Book(2L, "Book B", "974-1-4842-3197-5", Language.ENGLISH,
						new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description")),
				PAGEABLE, 2);

		when(bookService.findAllBooksByTitle("Book", PAGEABLE)).thenReturn(page);

		mockMvc.perform(
				get("/books")
				.param("title", "Book")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.totalPages", is(1)))
			   .andExpect(jsonPath("$.number", is(0)))
			   .andExpect(jsonPath("$.size", is(10)))
			   .andExpect(jsonPath("$.numberOfElements", is(2)))
			   .andExpect(jsonPath("$.content[0].title", is("Book A")))
			   .andExpect(jsonPath("$.content[1].title", is("Book B")));

		verify(bookService, times(1)).findAllBooksByTitle("Book", PAGEABLE);
	}
	
	@Test
	public void findAllBooksByTitleAndLanguage() throws Exception {
		Page<Book> page = new PageImpl<Book>(Arrays.asList(new Book(1L, "Book A", "975-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description"),
				new Book(2L, "Book B", "974-1-4842-3197-5", Language.ENGLISH,
						new Category(1L, "Category", "Description"),
						Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0],
						"Description")),
				PAGEABLE, 2);

		when(bookService.findAllBooksByTitleAndLanguage("Book", Language.ENGLISH, PAGEABLE)).thenReturn(page);

		mockMvc.perform(
				get("/books")
				.param("title", "Book")
				.param("language", "ENGLISH")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.totalPages", is(1)))
			   .andExpect(jsonPath("$.number", is(0)))
			   .andExpect(jsonPath("$.size", is(10)))
			   .andExpect(jsonPath("$.numberOfElements", is(2)))
			   .andExpect(jsonPath("$.content[0].title", is("Book A")))
			   .andExpect(jsonPath("$.content[1].title", is("Book B")));

		verify(bookService, times(1)).findAllBooksByTitleAndLanguage("Book", Language.ENGLISH, PAGEABLE);
	}
	
	@Test
	public void findBookByIdTest() throws Exception {
		Book book = new Book(1L, "Book", "978-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[0], "Description");

		when(bookService.findBookById(1L)).thenReturn(book);

		mockMvc.perform(get("/books/1"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.title", is("Book")))
			   .andExpect(jsonPath("$.isbn", is("978-1-4842-3197-5")))
			   .andExpect(jsonPath("$.language", is("ENGLISH")))
			   .andExpect(jsonPath("$.category.name", is("Category")))
			   .andExpect(jsonPath("$.authors[0].name", is("Author")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(bookService, times(1)).findBookById(1L);
	}

	@Test
	public void findBookContentTest() throws Exception {
		Book book = new Book(1L, "Book", "978-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), new byte[128], "Description");

		when(bookService.findBookById(1L)).thenReturn(book);

		mockMvc.perform(get("/books/1/content"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_OCTET_STREAM))
			   .andExpect(jsonPath("$", notNullValue()));

		verify(bookService, times(1)).findBookById(1L);
	}
	
	@Test
	public void saveBookTest() throws Exception {
		Book book = new Book(null, "Book", "978-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), null, "Description");

		when(bookService.saveBook(book)).thenReturn(new Book(1L, "Book", "978-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), null, "Description"));

		mockMvc.perform(
				post("/books")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(book))
				)
			   .andExpect(status().isCreated())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.id", is(1)))
			   .andExpect(jsonPath("$.title", is("Book")))
			   .andExpect(jsonPath("$.isbn", is("978-1-4842-3197-5")))
			   .andExpect(jsonPath("$.language", is("ENGLISH")))
			   .andExpect(jsonPath("$.category.name", is("Category")))
			   .andExpect(jsonPath("$.authors[0].name", is("Author")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(bookService, times(1)).saveBook(book);
	}

	@Test
	public void updateBookTest() throws Exception {
		Book book = new Book(1L, "Book", "978-1-4842-3197-5", Language.ENGLISH,
				new Category(1L, "Category", "Description"),
				Arrays.asList(new Author(1L, "Author", "author@gmail.com", "Description")), null, "Description");

		when(bookService.updateBook(book, 1L)).thenReturn(book);

		mockMvc.perform(
				put("/books/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(book))
				)
			   .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.id", is(1)))
			   .andExpect(jsonPath("$.title", is("Book")))
			   .andExpect(jsonPath("$.isbn", is("978-1-4842-3197-5")))
			   .andExpect(jsonPath("$.language", is("ENGLISH")))
			   .andExpect(jsonPath("$.category.name", is("Category")))
			   .andExpect(jsonPath("$.authors[0].name", is("Author")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(bookService, times(1)).updateBook(book, 1L);
	}

	@Test
	public void deleteBookByIdTest() throws Exception {
		doNothing().when(bookService).deleteBookById(1L);

		mockMvc.perform(delete("/books/1"))
		       .andExpect(status().isNoContent());

		verify(bookService, times(1)).deleteBookById(1L);
	}

}
