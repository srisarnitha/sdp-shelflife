package com.example.shelflife.entity;


import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "bill_product")
public class BillProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String pname;
    private int quantity;
    private BigDecimal gstRate;
    private BigDecimal mrp;
    private BigDecimal amount;

    @ManyToOne
    @JoinColumn(name = "billNo", referencedColumnName = "billNo")
    private Bills bill;



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getGstRate() {
		return gstRate;
	}

	public void setGstRate(BigDecimal gstRate) {
		this.gstRate = gstRate;
	}

	public BigDecimal getMrp() {
		return mrp;
	}

	public void setMrp(BigDecimal mrp) {
		this.mrp = mrp;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Bills getBill() {
		return bill;
	}

	public void setBill(Bills bill) {
		this.bill = bill;
	}

    // Getters and setters...
}
