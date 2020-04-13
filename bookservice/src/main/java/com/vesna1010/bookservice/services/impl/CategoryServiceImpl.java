package com.vesna1010.bookservice.services.impl;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.vesna1010.bookservice.models.Category;
import com.vesna1010.bookservice.repositories.CategoryRepository;
import com.vesna1010.bookservice.services.CategoryService;

@Transactional
@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<Category> findAllCategories(Sort sort) {
		return categoryRepository.findAll(sort);
	}

	@Override
	public Page<Category> findAllCategories(Pageable pageable) {
		return categoryRepository.findAll(pageable);
	}

	@Override
	public Category findCategoryById(Long id) {
		Optional<Category> optional = categoryRepository.findById(id);

		return optional.orElseThrow(() -> new RuntimeException("No category with id " + id));
	}

	@Override
	public Category saveCategory(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(Category category, Long id) {
		if (!categoryRepository.existsById(id)) {
			throw new RuntimeException("No category with id " + id);
		}

		return categoryRepository.save(category);
	}

	@Override
	public void deleteCategoryById(Long id) {
		if (!categoryRepository.existsById(id)) {
			throw new RuntimeException("No category with id " + id);
		}

		categoryRepository.deleteById(id);
	}

}
