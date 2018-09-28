import React from 'react';
import EditStudent from './EditStudent'
import { Redirect } from 'react-router-dom';
import './Button.css'
import Button from './Button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 

class ListOfStudents extends React.Component
{
    constructor(props)
    {
        super(props)
        this.handleBack=this.handleBack.bind(this);
        this.state={
            students:[],
            editClicked: false,
            studentToEdit:{},
            referrer:null,studentid:""
        }
      this.updateStudentIDinEditStudent=this.updateStudentIDinEditStudent.bind(this)
    }
    handleBack()
    {
        this.props.history.push('/TeacherHome');
    }
    componentDidMount()
    {
        this.loadStudentsFromServer()
    }

    loadStudentsFromServer()
    {

      fetch('http://localhost:8080/getAllStudent')
        .then(res => res.json())
        .then((rows=[]) => {
          this.setState({ students: rows })
        })
    }
    handleEditClicked(student)
    {
        const id = student.id;
        fetch('http://localhost:8080/viewStudentByID?id='+id,{method:'GET'})
        .then(res=>res.json())
        .then((dataById={})=>{
            this.setState({studentToEdit:dataById})
            this.setState({referrer:'/ListOfStudents/EditStudent'})
            this.updateStudentIDinEditStudent(this.state.studentToEdit)
        }) 
    }
    studentToEditlist(value)
    {
        this.setState=({studentid:value});
        <EditStudent studentData={this.studentToEditlist }/> 
    }  
    updateStudentIDinEditStudent(student)
    {
        //const id = student.id;
        // fetch("http://localhost:8080/updateStudent?student="+student+"&id="+id,{method: 'PUT'})
        // .then( res=>res.json())
        // .then(res => this.loadStudentsFromServer()
        // )
    }
    handleDeleteClicked(student)
    {  
        const id = student.id;
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => fetch('http://localhost:8080/deleteStudent?id='+id, {method:'POST',mode:'no-cors'})
                               .then(res=>this.loadStudentsFromServer())
              },
              {
                label: 'No'
              }
            ]
          })
        }
    render()
    {
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;
      // <EditStudent studentData={this.state.studentToEdit}></EditStudent>
      //  console.log(this.state.studentToEdit)
        return( 
            <div>
            <table className="center">
            <tr>
                <th>StudentId</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Class</th>
                <th>Division</th>
                <th>AddressLine1</th>
                <th>AddressLine2</th>
                <th>PIN code</th>
                <th>Edit / Delete </th>
            </tr>
            <tbody>
            {
            this.state.students.map((student,index)=>
            {
                return (
                    <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.studentClass}</td>
                    <td>{student.division}</td>
                    <td>{student.addressLine1}</td>
                    <td>{student.addressLine2}</td>
                    <td>{student.pincode}</td>
                    <td>
                    <button className="btn btn-primary btn-xs" onClick={() => this.handleEditClicked(student)} >Edit  </button>
                    <button className="btn btn-primary btn-xs" onClick={() => this.handleDeleteClicked(student)}>Delete</button>
                    </td>
                    </tr>
                ) 
            })    
            }
            </tbody>
        </table>
        <Button buttonName="Back" handleOnClick={this.handleBack}/>
         
        </div>
        );
    }
}
export default ListOfStudents;  