package com.vesna1010.bookservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vesna1010.bookservice.models.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

}
