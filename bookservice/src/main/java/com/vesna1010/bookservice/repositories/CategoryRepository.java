package com.vesna1010.bookservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vesna1010.bookservice.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
