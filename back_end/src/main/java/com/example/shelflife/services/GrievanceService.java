package com.example.shelflife.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shelflife.entity.Grievance;
import com.example.shelflife.repo.GrievanceRepo;

@Service
public class GrievanceService {
	
	@Autowired
	GrievanceRepo repo;
	
    public List<Grievance> getAllGrievances() {
        return repo.findAll();
    }

    public Grievance updateGrievance(int id, Grievance grievance) {
        Grievance g = repo.findById(id).orElse(null);
        if (g!=null) {
            g.setResponse(grievance.getResponse());
            g.setResolved(grievance.getResolved());
            return repo.save(g);
        }
        return null;
    }

}
