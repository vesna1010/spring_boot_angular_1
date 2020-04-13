package com.vesna1010.bookservice.services;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.vesna1010.bookservice.models.Author;

public interface AuthorService {

	List<Author> findAllAuthors(Sort sort);
	
	Page<Author> findAllAuthors(Pageable pageable);

	Author findAuthorById(Long id);

	Author saveAuthor(Author author);

	Author updateAuthor(Author author, Long id);

	void deleteAuthorById(Long id);

}
