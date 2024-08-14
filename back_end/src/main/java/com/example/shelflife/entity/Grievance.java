package com.example.shelflife.entity;

import java.sql.Date;
import jakarta.persistence.*;

@Entity
@Table(name="grievance")
public class Grievance {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int gId;
	private int uId;
	private Boolean resolved;
	private Date date;
	private String text;
	private String response;
	private String subject;
	private String userName;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getgId() {
		return gId;
	}
	public void setgId(int gId) {
		this.gId = gId;
	}
	public int getuId() {
		return uId;
	}
	public void setuId(int uId) {
		this.uId = uId;
	}
	public Boolean getResolved() {
		return resolved;
	}
	public void setResolved(Boolean resolved) {
		this.resolved = resolved;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	

}
