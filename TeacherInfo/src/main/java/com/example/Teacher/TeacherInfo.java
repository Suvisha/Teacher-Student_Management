package com.example.Teacher;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TeacherInfo 
{
	    @Id
	    @GeneratedValue(strategy=GenerationType.AUTO)
	    private Integer Teacherid;
	    private String firstName;
	    private String lastName;
	    private String userName;
	    private String password;

		public Integer getId() 
		{
			return Teacherid;
		}

		public void setId(Integer id) 
		{
			Teacherid = id;
		}

		public String getfirstName() 
		{
			return firstName;
		}

		public void setfirstName(String firstName) 
		{
			this.firstName = firstName;
		}

		public String getuserName() 
		{
			return userName;
		}

		public void setuserName(String userName) 
		{
			this.userName = userName;
		}
		public String getlastName() 
		{
			return lastName;
		}

		public void setlastName(String lastName) 
		{
			this.lastName = lastName;
		}
		public String getpassword() 
		{
			return password;
		}

		public void setpassword(String password) 
		{
			this.password = password;
		}
}
