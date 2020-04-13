package com.vesna1010.bookservice.controllers;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
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
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import com.vesna1010.bookservice.models.Author;
import com.vesna1010.bookservice.services.AuthorService;

public class AuthorControllerTest extends BaseControllerTest {

	@MockBean
	private AuthorService authorService;

	@Test
	public void findAllAuthorsBySortTest() throws Exception {
		List<Author> authors = Arrays.asList(new Author(1L, "Author A", "authorA@gmail.com", "Description A"),
				new Author(2L, "Author B", "authorB@gmail.com", "Description B"));

		when(authorService.findAllAuthors(SORT)).thenReturn(authors);

		mockMvc.perform(get("/authors"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$", hasSize(2)))
			   .andExpect(jsonPath("$[0].name", is("Author A")))
			   .andExpect(jsonPath("$[1].name", is("Author B")));

		verify(authorService, times(1)).findAllAuthors(SORT);
	}
	
	@Test
	public void findAllAuthorsByPageableTest() throws Exception {
		Page<Author> page = new PageImpl<Author>(
				Arrays.asList(new Author(1L, "Author A", "authorA@gmail.com", "Description A"),
						new Author(2L, "Author B", "authorB@gmail.com", "Description B")),
				PAGEABLE, 2);

		when(authorService.findAllAuthors(PAGEABLE)).thenReturn(page);

		mockMvc.perform(
				get("/authors")
				.param("page", "0")
				.param("size", "10")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.totalPages", is(1)))
			   .andExpect(jsonPath("$.number", is(0)))
			   .andExpect(jsonPath("$.size", is(10)))
			   .andExpect(jsonPath("$.numberOfElements", is(2)))
			   .andExpect(jsonPath("$.content[0].name", is("Author A")))
			   .andExpect(jsonPath("$.content[1].name", is("Author B")));

		verify(authorService, times(1)).findAllAuthors(PAGEABLE);
	}

	@Test
	public void findAuthorByIdTest() throws Exception {
		Author author = new Author(1L, "Author", "author@gmail.com", "Description");

		when(authorService.findAuthorById(1L)).thenReturn(author);

		mockMvc.perform(get("/authors/1"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.name", is("Author")))
			   .andExpect(jsonPath("$.email", is("author@gmail.com")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(authorService, times(1)).findAuthorById(1L);
	}

	@Test
	public void saveAuthorTest() throws Exception {
		Author author = new Author(null, "Author", "author@gmail.com", "Description");

		when(authorService.saveAuthor(author)).thenReturn(new Author(1L, "Author", "author@gmail.com", "Description"));

		mockMvc.perform(
				post("/authors")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(author))
				)
		       .andExpect(status().isCreated())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.id", is(1)))
			   .andExpect(jsonPath("$.name", is("Author")))
			   .andExpect(jsonPath("$.email", is("author@gmail.com")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(authorService, times(1)).saveAuthor(author);
	}

	@Test
	public void updateAuthorTest() throws Exception {
		Author author = new Author(1L, "Author", "author@gmail.com", "Description");

		when(authorService.updateAuthor(author, 1L)).thenReturn(author);

		mockMvc.perform(
				put("/authors/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(author))
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.id", is(1)))
			   .andExpect(jsonPath("$.name", is("Author")))
			   .andExpect(jsonPath("$.email", is("author@gmail.com")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(authorService, times(1)).updateAuthor(author, 1L);
	}

	@Test
	public void deleteAuthorByIdTest() throws Exception {
		doNothing().when(authorService).deleteAuthorById(1L);

		mockMvc.perform(delete("/authors/1"))
		       .andExpect(status().isNoContent());

		verify(authorService, times(1)).deleteAuthorById(1L);
	}

}
