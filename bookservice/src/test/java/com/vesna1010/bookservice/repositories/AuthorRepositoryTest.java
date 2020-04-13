package com.vesna1010.bookservice.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import com.vesna1010.bookservice.models.Author;

public class AuthorRepositoryTest extends BaseRepositoryTest {

	@Autowired
	private AuthorRepository authorRepository;

	@Test
	public void findAllBySortTest() {
		List<Author> authors = authorRepository.findAll(SORT);

		assertEquals(3, authors.size());
		assertEquals("Author A", authors.get(0).getName());
		assertEquals("Author B", authors.get(1).getName());
		assertEquals("Author C", authors.get(2).getName());
	}

	@Test
	public void findAllByPageableTest() {
		Page<Author> page = authorRepository.findAll(PAGEABLE);
		List<Author> authors = page.getContent();

		assertEquals(10, page.getSize());
		assertEquals(0, page.getNumber());
		assertEquals(1, page.getTotalPages());
		assertEquals(3, page.getNumberOfElements());
		assertEquals("Author A", authors.get(0).getName());
		assertEquals("Author B", authors.get(1).getName());
		assertEquals("Author C", authors.get(2).getName());
	}

	@Test
	public void findByIdTest() {
		Optional<Author> optional = authorRepository.findById(1L);
		Author author = optional.get();

		assertEquals("Author A", author.getName());
		assertEquals(2, author.getBooks().size());
	}

	@Test
	public void findByIdNotFoundTest() {
		Optional<Author> optional = authorRepository.findById(4L);

		assertFalse(optional.isPresent());
	}

	@Test
	public void saveTest() {
		Author author = new Author(null, "Author", "author@gmail.com", "Description");

		author = authorRepository.save(author);

		assertNotNull(author.getId());
	}

	@Test
	public void existsByIdTest() {
		assertTrue(authorRepository.existsById(1L));
		assertFalse(authorRepository.existsById(4L));
	}

	@Test
	public void deleteByIdTest() {
		authorRepository.deleteById(1L);

		assertFalse(authorRepository.existsById(1L));
	}

}
