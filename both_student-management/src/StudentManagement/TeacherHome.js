import React from 'react';
import Button from "./Button";
import Home from "./Home";
import '../App.css';
import { Redirect } from 'react-router-dom';

class TeacherHome extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state={
          Teachername:"",
          listOfStudentsCalled:false,
          addNewStudentCalled:false,
          logOutCalled:false,
          referrer:null          
      };
      this.handleListOfStudents=this.handleListOfStudents.bind(this);
      this.handleNewStudent=this.handleNewStudent.bind(this);
      this.handleLogOut=this.handleLogOut.bind(this);
    }
    handleListOfStudents()
    {    
      this.setState({referrer:'/ListOfStudents'})
    }
    handleNewStudent()
    {
      this.setState({referrer:'/AddNewStudent'})
    }
    handleLogOut()
    {
      this.setState({referrer:'/'})
    }
    render()
    {
      const{referrer}=this.state
      if(referrer)
      {
        return <Redirect to={referrer}></Redirect>
      }
      return(
        <div id ="TeacherHome" className="col-75 ">
            <div className="right">  
                {/* <h2> Name:{this.props.teacherData.firstName} {this.props.teacherData.lastName}</h2> */}
            </div>
            <div className="center">
                <Home/>
            </div>   
            <form>
                <Button handleOnClick={this.handleListOfStudents} buttonName="List Of Students"> </Button>
                <Button handleOnClick={this.handleNewStudent} buttonName="Add New Students"> </Button>
                <Button handleOnClick={this.handleLogOut} buttonName="Log Out"> </Button>
            </form>
        </div>
      );
    }
}
export default TeacherHome;