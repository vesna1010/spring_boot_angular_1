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
import com.vesna1010.bookservice.models.Category;

public class CategoryRepositoryTest extends BaseRepositoryTest {

	@Autowired
	private CategoryRepository categoryRepository;

	@Test
	public void findAllBySortTest() {
		List<Category> categories = categoryRepository.findAll(SORT);

		assertEquals(3, categories.size());
		assertEquals("Category A", categories.get(0).getName());
		assertEquals("Category B", categories.get(1).getName());
		assertEquals("Category C", categories.get(2).getName());
	}

	@Test
	public void findAllByPageableTest() {
		Page<Category> page = categoryRepository.findAll(PAGEABLE);
		List<Category> categories = page.getContent();

		assertEquals(10, page.getSize());
		assertEquals(0, page.getNumber());
		assertEquals(1, page.getTotalPages());
		assertEquals(3, page.getNumberOfElements());
		assertEquals("Category A", categories.get(0).getName());
		assertEquals("Category B", categories.get(1).getName());
		assertEquals("Category C", categories.get(2).getName());
	}

	@Test
	public void findByIdTest() {
		Optional<Category> optional = categoryRepository.findById(1L);
		Category category = optional.get();

		assertEquals("Category A", category.getName());
		assertEquals(3, category.getBooks().size());
	}

	@Test
	public void findByIdNotFoundTest() {
		Optional<Category> optional = categoryRepository.findById(4L);

		assertFalse(optional.isPresent());
	}

	@Test
	public void saveTest() {
		Category category = new Category(null, "Category", "Description");

		category = categoryRepository.save(category);

		assertNotNull(category.getId());
	}

	@Test
	public void existsByIdTest() {
		assertTrue(categoryRepository.existsById(1L));
		assertFalse(categoryRepository.existsById(4L));
	}

	@Test
	public void deleteByIdTest() {
		categoryRepository.deleteById(1L);

		assertFalse(categoryRepository.existsById(1L));
	}

}
