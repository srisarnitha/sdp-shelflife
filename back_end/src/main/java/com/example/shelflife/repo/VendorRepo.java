package com.example.shelflife.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shelflife.entity.Vendor;

public interface VendorRepo extends JpaRepository<Vendor, Integer>{

}
