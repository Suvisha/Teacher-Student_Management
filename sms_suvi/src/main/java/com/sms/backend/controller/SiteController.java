package com.sms.backend.controller;

import com.sms.backend.exception.ResourceNotFoundException;
import com.sms.backend.model.Student;
import com.sms.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
public class SiteController {

    @Autowired
    private StudentRepository studentRepository;

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/api/get/allstudents", method = RequestMethod.GET)
    @ResponseBody
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @RequestMapping(value = "/api/post/students", method = RequestMethod.POST)
    @ResponseBody
    public Student createNote(@Valid @RequestBody Student student) {
        return studentRepository.save(student);
    }

    @RequestMapping(value = "/api/get/allstudents/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Student getStudentById(@PathVariable(value = "id") Integer studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));
    }

    @RequestMapping(value = "/api/get/student/{teacher_id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Student> getStudentByTeacherId(@PathVariable(value = "teacher_id") Integer teacher_Id) {
        return studentRepository.findStudentByTeacherId(teacher_Id);
    }

    @RequestMapping(value = "/api/put/students/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public Student updateNote(@PathVariable(value = "id") Integer studentId,
                              @Valid @RequestBody Student studentDetails) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));
        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setAddressLine1(studentDetails.getAddressLine1());
        student.setAddressLine2(studentDetails.getAddressLine2());
        student.setStudentClass(studentDetails.getStudentClass());
        student.setDivision(studentDetails.getDivision());
        student.setTeacherId(studentDetails.getTeacherId());
        student.setPincode(studentDetails.getPincode());
        return studentRepository.save(student);
    }

    @RequestMapping(value = "/api/delete/students/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Integer studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));
        studentRepository.delete(student);
        return ResponseEntity.ok().build();
    }

}
