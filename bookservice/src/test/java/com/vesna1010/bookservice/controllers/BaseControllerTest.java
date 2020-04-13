package com.vesna1010.bookservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import com.vesna1010.bookservice.BaseTest;

@AutoConfigureMockMvc
public abstract class BaseControllerTest extends BaseTest {

	@Autowired
	protected MockMvc mockMvc;

}
