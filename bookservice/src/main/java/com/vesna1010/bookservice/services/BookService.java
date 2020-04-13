package com.vesna1010.bookservice.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.vesna1010.bookservice.enums.Language;
import com.vesna1010.bookservice.models.Book;

public interface BookService {

	Page<Book> findAllBooks(Pageable pageable);

	Page<Book> findAllBooksByCategoryId(Long id, Pageable pageable);

	Page<Book> findAllBooksByTitle(String title, Pageable pageable);

	Page<Book> findAllBooksByTitleAndLanguage(String title, Language language, Pageable pageable);

	Book findBookById(Long id);

	Book saveBook(Book book);

	Book updateBook(Book book, Long id);

	void deleteBookById(Long id);

}
