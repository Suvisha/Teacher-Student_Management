import React from 'react';
import axios from 'axios'
import TeacherHome from './TeacherHome';
import { Redirect } from 'react-router-dom';
import '../App.css';

export default class Login extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state={
          validCredentials:false,
          loggedData:[],error:" ",userName:"",password:"",
          sessionData:[],referrer:null,
          hits:null,TeacherData:{}
        }
        this.onLoginClick=this.onLoginClick.bind(this);
        this.checkLoginCredentials= this.checkLoginCredentials.bind(this)
    }
    onLoginClick()
    {
        const uname = document.getElementById("userName").value
        const pw =document.getElementById("password").value
        axios.get("http://localhost:8080/viewTeacher")
        .then(res=>res)
        .then(row => {
                this.checkLoginCredentials(row.data,uname,pw)
        }) 
    }
    checkLoginCredentials(fetchedData,uname,pw)
    {
        for(let i=0;i<fetchedData.length;i++)
        {
            if(uname===fetchedData[i].userName && pw===fetchedData[i].password)
            {
            this.setState({validCredentials:!this.state.validCredentials})
            this.setState({loggedData:fetchedData[i]})
            this.setState({referrer:'/TeacherHome'})
            this.setState({TeacherData:this.state.loggedData});
            this.setState({userName:this.state.loggedData.firstName});
            this.setState({password:this.state.loggedData.password});
            }
            else
             this.setState({error:"UserName or password is incorrect Plz check"})
        }
    }
    onSignUpClick()
    {
        this.props.history.push("/Registration")
    }
    render()
    {
        //const {userName,password} = this.state;
        if(this.state.validCredentials === true)
        {
            const {referrer} = this.state;
            
            if (referrer)
             return (<Redirect to={referrer} />,<TeacherHome teacherData={this.state.TeacherData}/>);
        }
        return(
        <div id="LoginData" className="LoginPage"> 
            <br/><br/>
            <label>User Name :</label>
            <input id="userName" type="text"  placeholder="User Name" ref={node => this.input = node}></input>
            <br/><br/>
            <label>Password :</label>
            <input id="password" type="password"  placeholder="Password"></input>
            <br/><br/>
            <button onClick={this.onLoginClick}>Login</button><br/><br/>
            <label className="label"> {this.state.error} </label> <br/><br/>
            <a href="/"> Home </a><br/><br/>
            <a href="/Registration">Registration</a>      
        </div>
        )
    }  
}