package com.example.Teacher;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class StudentInfo 
{
	 	@Id
	    @GeneratedValue(strategy=GenerationType.AUTO)
	    private Integer Studentid;
	 	private Integer Teacherid;
	    private String firstName;
	    private String lastName;
	    private String Class;
	    private String Division;
	    private String AddressLine1;
	    private String AddressLine2;
	    private Integer pincode;

		public Integer getId() 
		{
			return Studentid;
		}
		public void setId(Integer id) 
		{
			Studentid = id;
		}
		public Integer getTeacherId() 
		{
			return Teacherid;
		}
		public void setTeacherId(Integer id) 
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
		public String getlastName() 
		{
			return lastName;
		}
		public void setlastName(String lastName) 
		{
			this.lastName = lastName;
		}
		public String getClass1() 
		{
			return Class;
		}
		public void setClass1(String Class) 
		{
			this.Class = Class;
		}
		public String getdivision() 
		{
			return Division;
		}
		public void setDivision(String Division) 
		{
			this.Division = Division;
		}
		public String getAddressLine1() 
		{
			return AddressLine1;
		}
		public void setAddressLine1(String Addressline1) 
		{
			this.AddressLine1 = Addressline1;
		}
		public String getAddressLine2() 
		{
			return AddressLine2;
		}
		public void setAddressLine2(String Addressline2) 
		{
			this.AddressLine2 = Addressline2;
		}
		public int pincode() 
		{
			return pincode;
		}
		public void setpincode(int pincode) 
		{
			this.pincode = pincode;
		}
		@Override
		public String toString() 
		{
		   return "Student [Studentid=" + Studentid + ", firstName=" + firstName+ ", lastName=" + lastName + ", Class="
		          + Class + ", Division ="+ Division + ", AddressLine1="+ AddressLine1 + ", AddressLine2=" 
		          + AddressLine2 + ",PIN code="+pincode+ "]";
		}
}
