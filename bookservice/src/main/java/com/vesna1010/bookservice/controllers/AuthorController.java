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
import com.vesna1010.bookservice.models.Author;
import com.vesna1010.bookservice.services.AuthorService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/authors")
public class AuthorController {

	@Autowired
	private AuthorService authorService;

	@GetMapping(params = { "!page", "!size" })
	@ResponseStatus(HttpStatus.OK)
	public List<Author> findAllAuthors(@SortDefault(sort = "id", direction = Direction.ASC) Sort sort) {
		return authorService.findAllAuthors(sort);
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Page<Author> findAllAuthors(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		return authorService.findAllAuthors(pageable);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Author findAuthorById(@PathVariable final Long id) {
		return authorService.findAuthorById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Author saveAuthor(@RequestBody Author author) {
		return authorService.saveAuthor(author);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Author updateAuthor(@RequestBody Author author, @PathVariable final Long id) {
		return authorService.updateAuthor(author, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteAuthorById(@PathVariable final Long id) {
		authorService.deleteAuthorById(id);
	}

}
