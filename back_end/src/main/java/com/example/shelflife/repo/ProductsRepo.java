package com.example.shelflife.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.shelflife.entity.Products;

public interface ProductsRepo extends JpaRepository<Products, Integer>{
	
	@Query(value = "select p from Products p where p.quantity < p.threshold")
	public List<Products> findByStock();
	
	@Query(value = "select p from Products p where p.pname = :name")
	public Products findByName(String name);
}
