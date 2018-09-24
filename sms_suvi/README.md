# Student Management System Backend

### Change mysql username and password as per your installation

  - Open src/main/resources/application.properties
  - Change spring.datasource.username and spring.datasource.password as per your mysql installation

### Run Application

```sh
 ./mvnw spring-boot:run
```
### Explore Rest APIs
- List all students
```sh
http://localhost:8080/api/get/allstudents/
```
- Add student
```sh
http://localhost:8080/api/post/students
```
- Search student by ID
```sh
http://localhost:8080/api/get/allstudents/{id}
```
- List all students for a specific teacher
```sh
http://localhost:8080/api/get/student/{teacher_id}
```
- Update student
```sh
http://localhost:8080/api/put/students/{id}
```
- Delete student
```sh
http://localhost:8080/api/delete/students/{id}
```

### Editing UI
- Put your react code in _src/main/js/app.js_
- Add your CSS code in _src/main/resources/static/css/main.css_
_or_ Add new CSS file in _src/main/resources/static/css/ and edit src/main/resources/templates/index.html_

## For queries
##### Mail me at _hello@nidhinradh.me_