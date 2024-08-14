package com.example.shelflife.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shelflife.entity.Bills;
import com.example.shelflife.repo.BillsRepo;

@Service
public class BillsService {
	
	@Autowired
	BillsRepo repo;
	
	public Bills saveBill(Bills bill) {
		return repo.save(bill);
	}

}
