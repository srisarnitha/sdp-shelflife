package com.example.shelflife.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shelflife.entity.Company;
import com.example.shelflife.entity.Users;
import com.example.shelflife.repo.CompanyRepo;
import com.example.shelflife.repo.UsersRepo;

@Service
public class UsersService {

    @Autowired
    UsersRepo repo;
    
    @Autowired
    CompanyRepo compRepo;

    public Users saveUser(Users user) {
        return repo.save(user);
    }

    public Users findByUsernameAndPassword(String username, String password) {
        Users user = repo.findByUsernameAndPassword(username, password);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
    
    public Users getUserById(int userId) {
    	return repo.findById(userId).orElse(null);
    }
    
    public List<Users> getEmployeesByCompany(int cid) {
        return repo.findByCompanyCid(cid);
    }
    
   public void deleteById(int uid) {
	   repo.deleteById(uid);
   }
}

