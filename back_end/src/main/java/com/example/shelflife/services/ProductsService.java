package com.example.shelflife.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shelflife.entity.Products;
import com.example.shelflife.repo.ProductsRepo;


@Service
public class ProductsService {
	
	@Autowired
	private ProductsRepo repo;
	
	public List<Products> getAllProd(){
		return repo.findAll();		
	}
	
	public Products updateProduct(int pid, Products product) {
		Products prod = repo.findById(pid).orElse(null);
		prod.setCategory(product.getCategory());
		prod.setExpiry(product.getExpiry());
		prod.setMRP(product.getMRP());
		prod.setPname(product.getPname());
		prod.setQuantity(product.getQuantity());
		prod.setUnitPrice(product.getUnitPrice());
		prod.setVendorId(product.getVendorId());
		
		repo.save(prod);
		return prod;
		
	}
	
	public Products deleteProd(int pid) {
		Products prod = repo.findById(pid).orElse(null);
		repo.deleteById(pid);
		return prod;
	}
	
	public Products addProd(Products prod) {
		return repo.save(prod);
	}
	
	public List<Products> getLowStockProd(){
		return repo.findByStock();
	}
	
	public Products getByName(String name) {
		return repo.findByName(name);
	}
}
