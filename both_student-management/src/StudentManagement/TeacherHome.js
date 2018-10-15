import React from 'react';
import Button from "./Button";
import Home from "./Home";
import '../App.css';
//import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ListOfStudents from './ListOfStudents'
import AddNewStudent from './AddNewStudent'
import Login from './LoginPage'

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
      this.setState({listOfStudentsCalled:!this.state.listOfStudentsCalled})
    }
    handleNewStudent()
    {
      this.setState({addNewStudentCalled:!this.state.addNewStudentCalled})
    }
    handleLogOut= async event =>
    {
        const logout = this.props.teachers[0]
        this.props.dispatch({
            type:'LOGOUT',
            logout})
        this.setState({logOutCalled:!this.state.logOutCalled})
    }
    render()
    {
     // const{referrer}=this.state
      const {listOfStudentsCalled}=this.state;
      const {addNewStudentCalled}=this.state;
      const {logOutCalled}=this.state;
    //   if(referrer)
    //   {
    //       return <Redirect to={referrer}></Redirect>
    //   }
    //   else 
      if(logOutCalled)
      {
          return <Login></Login>
      }
      else if(addNewStudentCalled)
      {
          return <AddNewStudent ></AddNewStudent>
      }
      else if(listOfStudentsCalled)
      {
        //  return <ListOfStudents teacherId={this.props.teachers.teacherID}></ListOfStudents>
        return <ListOfStudents></ListOfStudents>
      }
      return(
        <div id ="TeacherHome" className="col-75 ">
            <div className="right">  
                <h2>{this.props.teachers.firstName} {this.props.teachers.lastName}</h2>
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
const mapStateToProps = (state) => {
  return{
      teachers:state.LoginReducer[0]
  }
}
export default connect (mapStateToProps) (TeacherHome);