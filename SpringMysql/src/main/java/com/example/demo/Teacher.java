package com.example.demo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;



@Entity
@Table(name="teacher_info")

@NamedStoredProcedureQueries({
	@NamedStoredProcedureQuery( name="sp_GetTeacher",
						procedureName="sp_GetTeacher", resultClasses=Teacher.class)
})
public class Teacher 
{
	@Id 
	@GeneratedValue
	@Column(name="TeacherID")
	private int TeacherID;
	@Column(name="firstName")
	private String firstName;
	@Column(name="lastName")
	private String lastName;
	@Column(name="userName")
	private String userName;
	@Column(name="password")
	@Length(min = 5, message = "*Your password must have at least 5 characters")
	private String password;
	
	public int getTeacherID() {
		return TeacherID;
	}
	public void setTeacherID(int teacherID) {
		TeacherID = teacherID;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
