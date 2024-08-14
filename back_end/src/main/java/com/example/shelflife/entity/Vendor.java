package com.example.shelflife.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vendor")
public class Vendor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String contactName;
	private String email;
	private String gstTin;
	private String name;
	private String phoneNo;
	private String productName;
	private String productType;
	private String vendorAddress;
	private String vendorCategory;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getContactName() {
		return contactName;
	}
	public void setContactName(String contactName) {
		this.contactName = contactName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getGstTin() {
		return gstTin;
	}
	public void setGstTin(String gstTin) {
		this.gstTin = gstTin;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getVendorAddress() {
		return vendorAddress;
	}
	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}
	public String getVendorCategory() {
		return vendorCategory;
	}
	public void setVendorCategory(String vendorCategory) {
		this.vendorCategory = vendorCategory;
	}
	
	

}
