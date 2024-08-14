package com.example.shelflife.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shelflife.entity.Bills;

public interface BillsRepo extends JpaRepository<Bills, Integer>{

}
