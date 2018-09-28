import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Registration from './StudentManagement/Registration.js'
import Login from './StudentManagement/LoginPage'
import TeacherHome from './StudentManagement/TeacherHome'
import ListOfStudents from './StudentManagement/ListOfStudents'
import AddNewStudent from './StudentManagement/AddNewStudent'
import EditStudent from './StudentManagement/EditStudent'
import DeleteStudent from './StudentManagement/DeleteStudent'
import './App.css';

class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state={isLoaded:true};
  }
  
  render() 
  {
    const {isLoaded}=this.state;
   if(isLoaded)
   {
    return(
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome To Student Management System</h1>
        </header> 
        <Router>
          <div>
            <Switch>   
              <Route exact path='/' component={Login} />   
              <Route exact path='/Registration' component={Registration} />
              <Route exact path='/TeacherHome' component={TeacherHome}/>     
              <Route exact path='/ListOfStudents' component={ListOfStudents} />
              <Route exact path='/AddNewStudent' component={AddNewStudent} />
              <Route exact path="/ListOfStudents/EditStudent" component={EditStudent}/>
              <Route exact path="/ListOfStudents/DeleteStudent" component={DeleteStudent}/>
            </Switch>
          </div>
        </Router>
        <footer className="App-Footer">
          <h6>Copyright © 2018 StudentManagement , Inc. All rights reserved.</h6>
        </footer>
    </div> 
    );
  }
  else
  {
    alert("Not connected spring url")}
  }
}
export default App;
