package com.example.shelflife.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shelflife.entity.Company;

public interface CompanyRepo extends JpaRepository<Company, Integer>{
	
	public boolean existsByBusinessRegNo (String businessRegNo);

}
