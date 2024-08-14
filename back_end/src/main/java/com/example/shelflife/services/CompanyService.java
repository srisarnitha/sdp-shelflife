package com.example.shelflife.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shelflife.entity.Company;
import com.example.shelflife.repo.CompanyRepo;

@Service
public class CompanyService {
	
	@Autowired
	CompanyRepo repo;
	
	public Company saveCompany(Company comp) {
		return repo.save(comp);
	}
	
	public Company findByCid(int cid) {
		return repo.findById(cid).orElse(null);
	}

}
