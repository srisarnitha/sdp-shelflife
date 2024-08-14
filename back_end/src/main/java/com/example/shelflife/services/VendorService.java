package com.example.shelflife.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shelflife.entity.Vendor;
import com.example.shelflife.repo.VendorRepo;

@Service
public class VendorService {
	
	@Autowired
	VendorRepo repo;
	
	public Vendor addVendor(Vendor vendor) {
		return repo.save(vendor);
	}
	
	public List<Vendor> getAll(){
		return repo.findAll();
	}

}
