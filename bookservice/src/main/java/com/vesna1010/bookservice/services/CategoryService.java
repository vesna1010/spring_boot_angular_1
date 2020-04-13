package com.vesna1010.bookservice.services;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.vesna1010.bookservice.models.Category;

public interface CategoryService {

	List<Category> findAllCategories(Sort sort);
	
	Page<Category> findAllCategories(Pageable pageable);

	Category findCategoryById(Long id);

	Category saveCategory(Category category);

	Category updateCategory(Category category, Long id);

	void deleteCategoryById(Long id);

}
