package com.example.demo.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Student;
import com.example.demo.Teacher;
import com.example.demo.repositoriess.StudentRepository;
import com.example.demo.repositoriess.TeacherRepository;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController 
{
	@Autowired
	private TeacherRepository teacherRepository;
	@Autowired
	private StudentRepository studentRepository;
	
	@RequestMapping(path="/")
	public String index()
	{
		return "index.html";
	}
	
	@PostMapping(path="/addTeacher")
	@ResponseBody
	public String addNewTeacher(@RequestParam String firstName, @RequestParam String lastName, 
								@RequestParam String userName, @RequestParam String password)
	{
		//System.out.println("Request from  react....");
		System.out.println("new teacher added....");
		Teacher addTeacher = new Teacher();
		addTeacher.setFirstName(firstName);
		addTeacher.setLastName(lastName);
		addTeacher.setUserName(userName);
		addTeacher.setPassword(password);
		teacherRepository.save(addTeacher);
		return "Teacher added..........";	
	}
	
	@GetMapping(path="/viewTeacher")
	@ResponseBody
	public  Iterable<Teacher> getAllTeachers() 
	{
		System.out.println("finding teacher...");
		return teacherRepository.findAll();
	}
	
	@PostMapping(path="/addStudent")
	@ResponseBody
	public String addNewStudent(@RequestParam String firstName, @RequestParam String lastName,@RequestParam int TeacherID,
			@RequestParam String classs, @RequestParam String division,@RequestParam String line1, @RequestParam String line2,@RequestParam String pinCode)
	{
		System.out.println("In add student....");
		Student addStudent= new Student();
		addStudent.setFirstName(firstName);
		addStudent.setLastName(lastName);
		addStudent.setTeacherId(TeacherID);
		addStudent.setStudentClass(classs);
		addStudent.setDivision(division);
		addStudent.setAddressLine1(line1);
		addStudent.setAddressLine2(line2);
		addStudent.setPINcode(pinCode);
		studentRepository.save(addStudent);
		return "Student Added..........";
	}
	
	@GetMapping(path="/getAllStudent")
	@ResponseBody
	public  Iterable<Student> getAllStudents() 
	{
		System.out.println("request from react to get student's list");
		return studentRepository.findAll();
	}
	
	@GetMapping(path="/viewStudentByID")
	@ResponseBody
	public  Optional<Student> getAllStudentById(int id)
	{
		System.out.println(studentRepository.findById(id));
		return studentRepository.findById(id);
	}
	
	
	@DeleteMapping (path="/deleteStudent")
	@ResponseBody
	public String deleteStudentById(int id)
	{
		System.out.println("request to delete a student....");
		studentRepository.deleteById(id);
		return "Student at id "+ id+ " is deleted";
	}
	
	
	@PostMapping(path="/updateStudent")
    public String updateStudent(@RequestParam int id,@RequestParam String firstName, @RequestParam String lastName,@RequestParam int TeacherId,
    		@RequestParam String classs, @RequestParam String division,@RequestParam String line1, @RequestParam String line2,@RequestParam String pinCode)
	{
    String notFound =ResponseEntity.notFound().build().toString();
    System.out.println("updating student....");
    Student updateStudent = new Student();
    Optional<Student> studentOptional = studentRepository.findById(id);
    if (!studentOptional.isPresent())
    {
           return notFound;
    }
    else{
    studentRepository.findById(id);
    updateStudent.setstudentId(id);
    updateStudent.setFirstName(firstName);
    updateStudent.setLastName(lastName);
    updateStudent.setTeacherId(TeacherId);
    updateStudent.setStudentClass(classs);
    updateStudent.setDivision(division);
    updateStudent.setAddressLine1(line1);
    updateStudent.setAddressLine2(line2);
    updateStudent.setPINcode(pinCode);
    studentRepository.save(updateStudent);
    }
    return "Student updated......";
    }
}
