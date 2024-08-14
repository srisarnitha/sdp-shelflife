package com.example.shelflife.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shelflife.entity.BillProduct;

public interface BillProductsRepo extends JpaRepository<BillProduct, Integer>{

}
