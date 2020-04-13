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
import com.vesna1010.bookservice.models.Category;
import com.vesna1010.bookservice.repositories.CategoryRepository;

public class CategoryServiceTest extends BaseServiceTest {

	@Autowired
	private CategoryService categoryService;
	@MockBean
	private CategoryRepository categoryRepository;

	@Test
	public void findAllCategoriesBySortTest() {
		List<Category> categories = Arrays.asList(new Category(1L, "Category A", "Description A"),
				new Category(2L, "Category B", "Description B"));

		when(categoryRepository.findAll(SORT)).thenReturn(categories);

		List<Category> categoriesDb = categoryService.findAllCategories(SORT);

		assertEquals(2, categoriesDb.size());
		assertEquals("Category A", categoriesDb.get(0).getName());
		assertEquals("Category B", categoriesDb.get(1).getName());
		verify(categoryRepository, times(1)).findAll(SORT);
	}

	@Test
	public void findAllCategoriesByPageableTest() {
		Page<Category> page = new PageImpl<Category>(Arrays.asList(new Category(1L, "Category A", "Description A"),
				new Category(2L, "Category B", "Description B")), PAGEABLE, 2);

		when(categoryRepository.findAll(PAGEABLE)).thenReturn(page);

		Page<Category> pageDb = categoryService.findAllCategories(PAGEABLE);
		List<Category> categoriesDb = page.getContent();

		assertEquals(1, pageDb.getTotalPages());
		assertEquals(0, pageDb.getNumber());
		assertEquals(10, pageDb.getSize());
		assertEquals(2, pageDb.getNumberOfElements());

		assertEquals("Category A", categoriesDb.get(0).getName());
		assertEquals("Category B", categoriesDb.get(1).getName());
		verify(categoryRepository, times(1)).findAll(PAGEABLE);
	}

	@Test
	public void findCategoryByIdTest() {
		Optional<Category> optional = Optional.of(new Category(1L, "Category A", "Description A"));

		when(categoryRepository.findById(1L)).thenReturn(optional);

		Category categoryDb = categoryService.findCategoryById(1L);

		assertEquals("Category A", categoryDb.getName());
		assertEquals("Description A", categoryDb.getDescription());
		verify(categoryRepository, times(1)).findById(1L);
	}

	@Test
	public void findCategoryByIdExceptionTest() {
		Optional<Category> optional = Optional.empty();

		when(categoryRepository.findById(1L)).thenReturn(optional);

		assertThrows(RuntimeException.class, () -> categoryService.findCategoryById(1L));

		verify(categoryRepository, times(1)).findById(1L);
	}

	@Test
	public void saveCategoryTest() {
		Category category = new Category(null, "Category", "Description");

		when(categoryRepository.save(category)).thenReturn(new Category(1L, "Category", "Description"));

		Category categoryDb = categoryService.saveCategory(category);

		assertEquals(1, categoryDb.getId());
		verify(categoryRepository, times(1)).save(category);
	}

	@Test
	public void updateCategoryTest() {
		Category category = new Category(1L, "Category", "Description");

		when(categoryRepository.existsById(1L)).thenReturn(true);
		when(categoryRepository.save(category)).thenReturn(category);

		Category categoryDb = categoryService.updateCategory(category, 1L);

		assertEquals(categoryDb, category);
		verify(categoryRepository, times(1)).existsById(1L);
		verify(categoryRepository, times(1)).save(category);
	}

	@Test
	public void updateCategoryExceptionTest() {
		Category category = new Category(1L, "Category", "Description");

		when(categoryRepository.existsById(1L)).thenReturn(false);
		when(categoryRepository.save(category)).thenReturn(category);

		assertThrows(RuntimeException.class, () -> categoryService.updateCategory(category, 1L));

		verify(categoryRepository, times(1)).existsById(1L);
		verify(categoryRepository, never()).save(category);
	}

	@Test
	public void deleteCategoryByIdTest() {
		when(categoryRepository.existsById(1L)).thenReturn(true);
		doNothing().when(categoryRepository).deleteById(1L);

		categoryService.deleteCategoryById(1L);

		verify(categoryRepository, times(1)).existsById(1L);
		verify(categoryRepository, times(1)).deleteById(1L);
	}

	@Test
	public void deleteCategoryByIdExceptionTest() {
		when(categoryRepository.existsById(1L)).thenReturn(false);
		doNothing().when(categoryRepository).deleteById(1L);

		assertThrows(RuntimeException.class, () -> categoryService.deleteCategoryById(1L));

		verify(categoryRepository, times(1)).existsById(1L);
		verify(categoryRepository, never()).deleteById(1L);
	}

}
