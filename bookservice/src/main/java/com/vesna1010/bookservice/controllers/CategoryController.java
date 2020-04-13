package com.vesna1010.bookservice.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vesna1010.bookservice.models.Category;
import com.vesna1010.bookservice.services.CategoryService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping(params = { "!page", "!size" })
	@ResponseStatus(HttpStatus.OK)
	public List<Category> findAllCategories(@SortDefault(sort = "id", direction = Direction.ASC) Sort sort) {
		return categoryService.findAllCategories(sort);
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Page<Category> findAllCategories(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		return categoryService.findAllCategories(pageable);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Category findCategoryById(@PathVariable final Long id) {
		return categoryService.findCategoryById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Category saveCategory(@RequestBody Category category) {
		return categoryService.saveCategory(category);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Category updateCategory(@RequestBody Category category, @PathVariable final Long id) {
		return categoryService.updateCategory(category, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCategoryById(@PathVariable final Long id) {
		categoryService.deleteCategoryById(id);
	}

}
