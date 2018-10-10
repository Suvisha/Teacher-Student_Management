import React from 'react';
import { Redirect } from 'react-router-dom';
import './Button.css'
import Button from './Button';
import EditStudent from './EditStudent';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { Table } from 'react-bootstrap';
import TeacherHome from './TeacherHome';

class ListOfStudents extends React.Component
{
    constructor(props)
    {
        super(props)
        this.handleBack=this.handleBack.bind(this);
        this.state={
            students:[],
            editClicked: false,
            handleBackCalled:false,
            studentToEdit:{},
            referrer:null,
            studentData:{}
        }
      this.updateStudentIDinEditStudent=this.updateStudentIDinEditStudent.bind(this)
    }
    handleBack()
    {
        //this.props.history.push('/TeacherHome');
        this.setState({handleBackCalled:!this.state.handleBackCalled});
        console.log(this.state.handleBackCalled);
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
        const id = student.studentId;
        Axios.get('http://localhost:8080/viewStudentByID?id='+id)
        .then(res=>res)
        .then((dataById={})=>{
            this.setState({studentToEdit:dataById})
            this.setState({referrer:'/ListOfStudents/EditStudent'})
            this.setState({studentData:this.state.studentToEdit.data});
        })
    }
    updateStudentIDinEditStudent(student)
    {
        const id=student.studentId;
        Axios.get('http://localhost:8080/updateStudent?student='+student+'&id='+id)
        .then(resp => resp)
        .then(findResp => this.setState({data:findResp}))
        .then(res=>this.loadStudentsFromServer())
    }
    handleDeleteClicked(student)
    {  
        const id = student.studentId;
        confirmAlert(
        {
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
        const {handleBackCalled}=this.state;
        console.log(handleBackCalled);
        if (referrer) 
            return (<Redirect to={referrer} />,<EditStudent studentToUpdate={this.state.studentData}/>);
        if(handleBackCalled)
            return <TeacherHome></TeacherHome>
        return(    
            <div>
                <Table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>TeacherID</th>
                            <th>class</th>
                            <th>division</th>
                            <th>AddressLine1</th>
                            <th>AddressLine2</th>
                            <th>pinCode</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        this.state.students.map((student,index)=>{
                            return (
                                <tbody>
                                    <tr key={index}>
                                        <td>{student.studentId}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.teacherId}</td>
                                        <td>{student.studentClass}</td>
                                        <td>{student.division}</td>
                                        <td>{student.addressLine1}</td>
                                        <td>{student.addressLine2}</td>
                                        <td>{student.pincode}</td>
                                        <td><Button buttonName="Edit" handleOnClick={() => this.handleEditClicked(student)}/></td>
                                        <td><Button buttonName="Delete" handleOnClick={() => this.handleDeleteClicked(student)}/></td>
                                    </tr>
                                </tbody>
                            ) 
                        })    
                    }
                    
                </Table>
                <Button buttonName="Back" handleOnClick={this.handleBack}/>
            </div>
        );
    }
}
export default ListOfStudents;  
















/*
<EditStudent studentToUpdate={this.state.studentToEdit.data}/>);
<table className="center">
                     <tbody>           
                         <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>TeacherID</th>
                            <th>class</th>
                            <th>division</th>
                            <th>line1</th>
                            <th>line2</th>
                            <th>pinCode</th>
                        </tr>
                     </tbody>
                     </table> 
 */






    // constructor(props)
    // {
    //     super(props);
    //     this.handleList = this.handleList.bind(this);
    // }
    // handleList()
    // {
    //     var names = [['1','Venu','v c', '9','D','MP,Null stop','pune','780405'],
    //                 ['2','Veag','Kta', '9','A','hp,Swargate','pune','780404'],
    //                 ['3','ragha','Sha', '9','B','LK,Karve road','pune','780801']];
    //     return (
    //         <div >
                
    //         <table>
    //         {
                
    //             names.map(function(name, index) 
    //             {
    //                 return <div> 
    //                         <tr>
    //                             <td>{name[0]}</td>
    //                             <td>{name[1]}</td>
    //                             <td>{name[2]}</td>
    //                             <td>{name[3]}</td>
    //                             <td>{name[4]}</td>
    //                             <td>{name[5]}</td>
    //                             <td>{name[6]}</td>
    //                             <td>{name[7]}</td>
    //                             <td><EditLink></EditLink></td>
    //                             <td><DeleteLink></DeleteLink></td>
    //                         </tr>
    //                       </div>
    //             })
    //         }
    //         </table>
    //     </div>
    //     )
    // }
    // render() {
    // return (
    //         <div>
    //             <center> {this.handleList()} </center>
    //         </div>
    //         );
    //         }


