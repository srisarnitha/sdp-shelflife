package com.example.shelflife.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.shelflife.entity.Company;
import com.example.shelflife.entity.Users;

public interface UsersRepo extends JpaRepository<Users, Integer>{
	
	@Query(value = "select u from Users u where u.username = :username and u.password = :password")
    Users findByUsernameAndPassword(String username, String password);
	
	List<Users> findByCompanyCid(int cid);

}
