package com.vesna1010.bookservice.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.vesna1010.bookservice.enums.Language;
import com.vesna1010.bookservice.models.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	
	Page<Book> findAllByCategoryId(Long id, Pageable pageable);
	
	Page<Book> findAllByTitleContains(String value, Pageable pageable);

	Page<Book> findAllByTitleContainsAndLanguage(String value, Language language, Pageable pageable);

}
