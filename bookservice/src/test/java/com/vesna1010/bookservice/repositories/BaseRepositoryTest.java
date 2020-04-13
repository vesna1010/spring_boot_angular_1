package com.vesna1010.bookservice.repositories;

import javax.transaction.Transactional;
import org.springframework.test.context.jdbc.Sql;
import com.vesna1010.bookservice.BaseTest;

@Transactional
@Sql(scripts = "classpath:init.sql")
public abstract class BaseRepositoryTest extends BaseTest {

}
