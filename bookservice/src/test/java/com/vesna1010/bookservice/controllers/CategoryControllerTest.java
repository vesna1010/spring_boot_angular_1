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
import com.vesna1010.bookservice.models.Category;
import com.vesna1010.bookservice.services.CategoryService;

public class CategoryControllerTest extends BaseControllerTest {

	@MockBean
	private CategoryService categoryService;

	@Test
	public void findAllCategoriesBySortTest() throws Exception {
		List<Category> categories = Arrays.asList(new Category(1L, "Category A", "Description A"),
				new Category(2L, "Category B", "Description B"));

		when(categoryService.findAllCategories(SORT)).thenReturn(categories);

		mockMvc.perform(get("/categories"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$", hasSize(2)))
			   .andExpect(jsonPath("$[0].name", is("Category A")))
			   .andExpect(jsonPath("$[1].name", is("Category B")));

		verify(categoryService, times(1)).findAllCategories(SORT);
	}
	
	@Test
	public void findAllCategoriesByPageTest() throws Exception {
		Page<Category> page = new PageImpl<Category>(Arrays.asList(new Category(1L, "Category A", "Description A"),
				new Category(2L, "Category B", "Description B")), PAGEABLE, 2);

		when(categoryService.findAllCategories(PAGEABLE)).thenReturn(page);

		mockMvc.perform(
				get("/categories")
				.param("page", "0")
				.param("size", "10")
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.totalPages", is(1)))
			   .andExpect(jsonPath("$.number", is(0)))
			   .andExpect(jsonPath("$.size", is(10)))
			   .andExpect(jsonPath("$.numberOfElements", is(2)))
			   .andExpect(jsonPath("$.content[0].name", is("Category A")))
			   .andExpect(jsonPath("$.content[1].name", is("Category B")));

		verify(categoryService, times(1)).findAllCategories(PAGEABLE);
	}

	@Test
	public void findCategoryByIdTest() throws Exception {
		Category category = new Category(1L, "Category", "Description");

		when(categoryService.findCategoryById(1L)).thenReturn(category);

		mockMvc.perform(get("/categories/1"))
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.name", is("Category")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(categoryService, times(1)).findCategoryById(1L);
	}

	@Test
	public void saveCategoryTest() throws Exception {
		Category category = new Category(null, "Category", "Description");

		when(categoryService.saveCategory(category)).thenReturn(new Category(1L, "Category", "Description"));

		mockMvc.perform(
				post("/categories")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(category))
				)
		       .andExpect(status().isCreated())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.id", is(1)))
			   .andExpect(jsonPath("$.name", is("Category")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(categoryService, times(1)).saveCategory(category);
	}

	@Test
	public void updateCategoryTest() throws Exception {
		Category category = new Category(1L, "Category", "Description");

		when(categoryService.updateCategory(category, 1L)).thenReturn(category);

		mockMvc.perform(
				put("/categories/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(OBJECT_MAPPER.writeValueAsString(category))
				)
		       .andExpect(status().isOk())
			   .andExpect(content().contentType(MediaType.APPLICATION_JSON))
			   .andExpect(jsonPath("$.id", is(1)))
			   .andExpect(jsonPath("$.name", is("Category")))
			   .andExpect(jsonPath("$.description", is("Description")));

		verify(categoryService, times(1)).updateCategory(category, 1L);
	}

	@Test
	public void deleteCategoryByIdTest() throws Exception {
		doNothing().when(categoryService).deleteCategoryById(1L);

		mockMvc.perform(delete("/categories/1"))
		       .andExpect(status().isNoContent());

		verify(categoryService, times(1)).deleteCategoryById(1L);
	}

}
