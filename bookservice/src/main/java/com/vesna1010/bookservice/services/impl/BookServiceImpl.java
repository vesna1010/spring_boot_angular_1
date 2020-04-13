package com.vesna1010.bookservice.services.impl;

import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.vesna1010.bookservice.enums.Language;
import com.vesna1010.bookservice.models.Book;
import com.vesna1010.bookservice.repositories.BookRepository;
import com.vesna1010.bookservice.services.BookService;

@Transactional
@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;

	@Override
	public Page<Book> findAllBooks(Pageable pageable) {
		return bookRepository.findAll(pageable);
	}

	@Override
	public Page<Book> findAllBooksByCategoryId(Long id, Pageable pageable) {
		return bookRepository.findAllByCategoryId(id, pageable);
	}

	@Override
	public Page<Book> findAllBooksByTitle(String title, Pageable pageable) {
		return bookRepository.findAllByTitleContains(title, pageable);
	}

	@Override
	public Page<Book> findAllBooksByTitleAndLanguage(String title, Language language, Pageable pageable) {
		return bookRepository.findAllByTitleContainsAndLanguage(title, language, pageable);
	}

	@Override
	public Book findBookById(Long id) {
		Optional<Book> optional = bookRepository.findById(id);

		return optional.orElseThrow(() -> new RuntimeException("No book with id " + id));
	}

	@Override
	public Book saveBook(Book book) {
		return bookRepository.save(book);
	}

	@Override
	public Book updateBook(Book book, Long id) {
		if (!bookRepository.existsById(id)) {
			throw new RuntimeException("No book with id " + id);
		}

		return bookRepository.save(book);
	}

	@Override
	public void deleteBookById(Long id) {
		if (!bookRepository.existsById(id)) {
			throw new RuntimeException("No book with id " + id);
		}

		bookRepository.deleteById(id);
	}

}
