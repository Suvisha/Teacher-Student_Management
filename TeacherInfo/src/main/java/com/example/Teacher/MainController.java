package com.example.Teacher;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.Teacher.TeacherInfo;
import com.example.Teacher.TeacherRepository;
import com.example.Teacher.StudentInfo;
import com.example.Teacher.StudentRepository;

@Controller    
@RequestMapping(path="/demo") 
public class MainController 
{
	@Autowired 
	private TeacherRepository teacherRepository;
	@Autowired
    private StudentRepository studentRepository;
	@GetMapping(path="/addTeacher") 
	public @ResponseBody String addNewTeacher (@RequestParam String firstName
			, @RequestParam String lastName ,@RequestParam String userName
			, @RequestParam String password) 
	{
		TeacherInfo n = new TeacherInfo();
		n.setfirstName(firstName);
		n.setlastName(lastName);
		n.setuserName(userName);
		n.setpassword(password);
		teacherRepository.save(n);
		return "Saved";
	}
	
	@GetMapping(path="/addStudent") 
	public @ResponseBody String addNewStudent (@RequestParam String firstName
			, @RequestParam String lastName ,@RequestParam String Class
			, @RequestParam String Division
			, @RequestParam String AddressLine1
			, @RequestParam String AddressLine2
			, @RequestParam Integer pincode) 
	{
		StudentInfo s = new StudentInfo();
		s.setfirstName(firstName);
		s.setlastName(lastName);
		s.setClass1(Class);
		s.setDivision(Division);
		s.setAddressLine1(AddressLine1);
		s.setAddressLine2(AddressLine2);
		s.setpincode(pincode);
		studentRepository.save(s);
		return "Saved";
	}
	
	@GetMapping(path="/allStudents" )
	public @ResponseBody Iterable<StudentInfo> getAllStudents() 
	{
		return studentRepository.findAll();
	}
	
//	@GetMapping(path="/EditStudent")
//	public @ResponseBody Iterable<StudentInfo> getStudentById(int id)
//	{
//		StudentInfo student;
//		if(student.getId()==id)
//		{
//		  
//		}
//		return null;
//	}
}
