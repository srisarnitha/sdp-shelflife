package com.example.shelflife.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "company")
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cid;
	
	private int adminId;
	private int adminPhoNo;
	private int phoNo;
	
	private String address;
	private String adminName;
	private String businessRegNo;
	private String email;
	private String name;
	private String password;
	private String position;
	private String vatNo;
	
	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public int getAdminPhoNo() {
		return adminPhoNo;
	}

	public void setAdminPhoNo(int adminPhoNo) {
		this.adminPhoNo = adminPhoNo;
	}

	public int getPhoNo() {
		return phoNo;
	}

	public void setPhoNo(int phoNo) {
		this.phoNo = phoNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getBusinessRegNo() {
		return businessRegNo;
	}

	public void setBusinessRegNo(String businessRegNo) {
		this.businessRegNo = businessRegNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getVatNo() {
		return vatNo;
	}

	public void setVatNo(String vatNo) {
		this.vatNo = vatNo;
	}


	


	
}
