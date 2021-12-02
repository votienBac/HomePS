package com.example.HomePS;

import com.example.HomePS.model.AppUser;
import com.example.HomePS.model.Role;
import com.example.HomePS.service.AppUserService;
import com.example.HomePS.configuration.SwaggerConfig;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
@Import(SwaggerConfig.class)
public class HomePsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomePsApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}


	/**
	 * this function run right after application begin
	 * check if user "admin" and role "ADMIN" existed in db
	 * if not, create and set role of user "admin" as "ADMIN"
	 */
	@Bean
	CommandLineRunner run(AppUserService userService) {
		return args -> {
			var user = userService.getUser("admin");
			if (user == null)
				userService.saveUser(new AppUser(null, "Admin", "admin", "123456", new ArrayList<>()));

			var role = userService.getRole("ADMIN");
			if (role == null) {
				userService.saveRole(new Role(null, "ADMIN"));
				userService.addRoleToUser("admin", "ADMIN");
			}
		};
	}
}
