package com.example.shelflife.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.shelflife.entity.BillProduct;
import com.example.shelflife.entity.Bills;
import com.example.shelflife.entity.Company;
import com.example.shelflife.entity.Grievance;
import com.example.shelflife.entity.Products;
import com.example.shelflife.entity.Users;
import com.example.shelflife.entity.Vendor;
import com.example.shelflife.services.BillsProdService;
import com.example.shelflife.services.BillsService;
import com.example.shelflife.services.GrievanceService;
import com.example.shelflife.services.ProductsService;
import com.example.shelflife.services.UsersService;
import com.example.shelflife.services.VendorService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

    @Autowired
    private UsersService userService;
    
    @Autowired
    private ProductsService prodServ;
    
    @Autowired
    private VendorService vendServ;
    
    @Autowired
    private BillsProdService billProdServ;
    
    @Autowired
    private BillsService billServ;
    
    @Autowired
    private GrievanceService grevServ;
    

    @PostMapping("/login")
    public ResponseEntity<Users> login(@RequestBody Users user) {
        Users existingUser = userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (existingUser != null) {
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
    
    @GetMapping("/users/{userId}")
    public ResponseEntity<String> getUserByName(@PathVariable int userId) {
        try {
            Users user = userService.getUserById(userId);
            if (user != null) {
                return ResponseEntity.ok(user.getName());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching user");
        }
    }
    
    @GetMapping("/get-profile/{userId}")
    public ResponseEntity<Users> getProfile(@PathVariable int userId) {
    	Users user = userService.getUserById(userId);
    	Company comp = user.getCompany();
    	return ResponseEntity.ok(user);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<Users> signUp(@RequestBody Users user){
    	Users us = userService.saveUser(user);
    	return ResponseEntity.ok(us);
    }
    
    @PutMapping("/update-profile")
    public ResponseEntity<Users> updateProfile(@RequestBody Users user){
    	Users us = userService.getUserById(user.getUid());
    	if(us!=null) {
    		us.setCompany(user.getCompany());
    		us.setEmail(user.getEmail());
    		us.setFname(user.getFname());
    		us.setLname(user.getLname());
    		us.setName(user.getName());
    		us.setPassword(user.getPassword());
    		us.setUser_type(user.getUser_type());
    		userService.saveUser(us);
    		
    		return ResponseEntity.ok(us);
    	}
    	else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);    	
        }
    }
    
    @PostMapping("/add-employee")
    public ResponseEntity<Users> addEmployee(@RequestBody Users user){
    	Users us = userService.saveUser(user);
    	return ResponseEntity.ok(us);
    }
    
    @GetMapping("/get-stock-details")
    public List<Products> getAllStock(){
    	return prodServ.getAllProd();
    }
    
    @PutMapping("/update-product/{pid}")
    public ResponseEntity<Products> updateProd(@PathVariable int pid, @RequestBody Products product){
    	Products prod = prodServ.updateProduct(pid, product);
    	return ResponseEntity.ok(prod);
    }
    
    @DeleteMapping("/delete-product/{pid}")
    public ResponseEntity<Products> deleteProd(@PathVariable int pid){
    	Products prod = prodServ.deleteProd(pid);
    	return ResponseEntity.ok(prod);
    }
    
    @PostMapping("/add-product")
    public ResponseEntity<Products> addProd(@RequestBody Products p){
    	Products prod = prodServ.addProd(p);
    	return ResponseEntity.ok(prod);
    }
    
    @PostMapping("/add-vendor")
    public ResponseEntity<Vendor> addVendor(@RequestBody Vendor vend){
    	Vendor vendr = vendServ.addVendor(vend);
    	return ResponseEntity.ok(vendr);
    }
    
    @GetMapping("/get-vendors")
    public List<Vendor> getAllVend(){
    	return vendServ.getAll();
    }
    
    @GetMapping("/low-stock")
    public List<Products> getLowStock(){
    	return prodServ.getLowStockProd();
    }
    
    @GetMapping("/product/search/{productName}")
    public ResponseEntity<Products> search(@PathVariable String productName) {
    	Products prod = prodServ.getByName(productName);
    	return ResponseEntity.ok(prod);
    }
    
    @PostMapping("/save-bill")
    public ResponseEntity<Bills> saveBill(@RequestBody Bills billData) {
        // Save the bill to the database
        Bills savedBill = billServ.saveBill(billData);

        // Save the products associated with this bill
        for (BillProduct product : billData.getProducts()) {
            product.setBill(savedBill);
            billProdServ.saveBillProd(product);
        }

        return ResponseEntity.ok(savedBill);
    }
    
    @GetMapping("/grievance-view")
    public ResponseEntity<List<Grievance>> getAllGrievances(){
    	return ResponseEntity.ok(grevServ.getAllGrievances());
    }
    
    @PutMapping("grievances/{id}")
    public Grievance updateGrievance(@PathVariable int id, @RequestBody Grievance grievance) {
        return grevServ.updateGrievance(id, grievance);
    }
    
    @GetMapping("/get-employees/{cid}")
    public List<Users> getEmployees(@PathVariable int cid){
    	return userService.getEmployeesByCompany(cid);
    }
    
    @DeleteMapping("/delete-employee/{uid}")
    public void deleteEmployee(@PathVariable int uid) {
    	userService.deleteById(uid);
    }
    
    @PutMapping("/update-employee/{uid}")
    public ResponseEntity<Users> updateEmployee(@PathVariable int uid, @RequestBody Users user) {
    	Users us = userService.getUserById(uid);
    	if(us!=null) {
    		us.setCompany(user.getCompany());
    		us.setEmail(user.getEmail());
    		us.setFname(user.getFname());
    		us.setLname(user.getLname());
    		us.setName(user.getName());
    		us.setPassword(user.getPassword());
    		us.setUser_type(user.getUser_type());
    		userService.saveUser(us);
    		
    		return ResponseEntity.ok(us);
    	}
    	else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);    	
        }
    	
    }
}
