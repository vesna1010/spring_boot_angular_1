package com.vesna1010.bookservice;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public abstract class BaseTest {

	public static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
	public static final Sort SORT = Sort.by("id");
	public static final Pageable PAGEABLE = PageRequest.of(0, 10, Direction.ASC, "id");

}
