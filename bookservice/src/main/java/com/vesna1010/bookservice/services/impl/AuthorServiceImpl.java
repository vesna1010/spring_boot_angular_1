package com.vesna1010.bookservice.services.impl;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.vesna1010.bookservice.models.Author;
import com.vesna1010.bookservice.models.Book;
import com.vesna1010.bookservice.repositories.AuthorRepository;
import com.vesna1010.bookservice.repositories.BookRepository;
import com.vesna1010.bookservice.services.AuthorService;

@Transactional
@Service
public class AuthorServiceImpl implements AuthorService {

	@Autowired
	private AuthorRepository authorRepository;
	@Autowired
	private BookRepository bookRepository;

	@Override
	public List<Author> findAllAuthors(Sort sort) {
		return authorRepository.findAll(sort);
	}

	@Override
	public Page<Author> findAllAuthors(Pageable pageable) {
		return authorRepository.findAll(pageable);
	}

	@Override
	public void deleteAuthorById(Long id) {
		Author author = this.findAuthorById(id);
		List<Book> books = author.getBooks();

		for (Book book : books) {
			List<Author> authors = book.getAuthors();

			if (authors.size() == 1) {
				bookRepository.delete(book);
			} else {
				authors.remove(author);
				bookRepository.save(book);
			}
		}

		authorRepository.deleteById(id);
	}

	@Override
	public Author findAuthorById(Long id) {
		Optional<Author> optional = authorRepository.findById(id);

		return optional.orElseThrow(() -> new RuntimeException("No author with id " + id));
	}

	@Override
	public Author saveAuthor(Author author) {
		return authorRepository.save(author);
	}

	@Override
	public Author updateAuthor(Author author, Long id) {
		if (!authorRepository.existsById(id)) {
			throw new RuntimeException("No author with id " + id);
		}

		return authorRepository.save(author);
	}

}
