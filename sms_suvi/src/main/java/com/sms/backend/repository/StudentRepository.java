package com.sms.backend.repository;

import com.sms.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    String FIND_STUDENTS = "SELECT * FROM students WHERE teacher_id = :teacherId";

    @Query(value = FIND_STUDENTS, nativeQuery = true)
    List<Student> findStudentByTeacherId(Integer teacherId);
}
