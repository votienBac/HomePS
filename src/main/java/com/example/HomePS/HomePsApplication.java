package com.example.HomePS;

import com.example.HomePS.configuration.SwaggerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(SwaggerConfig.class)
public class HomePsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomePsApplication.class, args);
	}

}
