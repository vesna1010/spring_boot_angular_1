package com.vesna1010.bookservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.vesna1010.bookservice.enums.Language;
import com.vesna1010.bookservice.models.Book;
import com.vesna1010.bookservice.services.BookService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/books")
public class BookController {

	@Autowired
	private BookService bookService;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Page<Book> findAllBooks(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		return bookService.findAllBooks(pageable);
	}

	@GetMapping(params = "categoryId")
	@ResponseStatus(HttpStatus.OK)
	public Page<Book> findAllBooksByCategoryId(@RequestParam final Long categoryId,
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		return bookService.findAllBooksByCategoryId(categoryId, pageable);
	}

	@GetMapping(params = "title")
	@ResponseStatus(HttpStatus.OK)
	public Page<Book> findAllBooksByTitle(@RequestParam final String title,
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		return bookService.findAllBooksByTitle(title, pageable);
	}

	@GetMapping(params = { "title", "language" })
	@ResponseStatus(HttpStatus.OK)
	public Page<Book> findAllBooksByTitleAndLanguage(@RequestParam final String title,
			@RequestParam final Language language,
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		return bookService.findAllBooksByTitleAndLanguage(title, language, pageable);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Book findBookById(@PathVariable final Long id) {
		return bookService.findBookById(id);
	}

	@GetMapping("/{id}/content")
	@ResponseStatus(HttpStatus.OK)
	public byte[] findBookContent(@PathVariable final Long id) {
		Book book = bookService.findBookById(id);

		return book.getContent();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Book saveBook(@RequestBody Book book) {
		return bookService.saveBook(book);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Book updateBook(@RequestBody Book book, @PathVariable final Long id) {
		return bookService.updateBook(book, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteBookById(@PathVariable final Long id) {
		bookService.deleteBookById(id);
	}

}
