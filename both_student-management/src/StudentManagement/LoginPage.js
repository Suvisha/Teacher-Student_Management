import React from 'react';
import axios from 'axios'
import TeacherHome from './TeacherHome';
import {connect} from 'react-redux'
import '../App.css';
import './Button.css';
import LoginImg from './LoginImg';
import Button from './Button'

class Login extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state={
        validCredentials:false,
        loggedData:[],
        validUser:React.createContext([]),
        error:'',
        hits:null,
        isAuthenticated: false,
        isAuthenticating: true,
        
      }
      this.onLoginClick=this.onLoginClick.bind(this);
      this.checkLoginCredentials= this.checkLoginCredentials.bind(this)
      this.storeCredentials = this.storeCredentials.bind(this)
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
            if(fetchedData[i].userName===uname && fetchedData[i].password===pw)
            {
                this.setState({loggedData:fetchedData[i]})
                this.storeCredentials(this.state.loggedData)
                break;
            }
            else if(uname===''|| pw==='')
            {
                this.setState({error:'Enter username or password...'})
            }
            else
            {
                this.setState({error:'invalid user or password...'})
            }
        }
    }
    storeCredentials(dataTobeStore)
    {
        if(dataTobeStore!==undefined)
        {
            const loggedInData = dataTobeStore
            this.props.dispatch({
                type:'ADD_LOGIN',loggedInData})
            this.setState({validCredentials:!this.state.validCredentials})
        }
    }
    render()
    {
        if(this.state.validCredentials === true)
        {
            return <TeacherHome />
        }
        return(
            <div>     
                <div id="LoginData" className="LoginPage"> 
                    <LoginImg></LoginImg><br/><br/>
                    <input id="userName" type="text"  placeholder="User Name" required></input>
                    <br/><br/>
                    {/* <label>Password&nbsp;&nbsp;&nbsp;: </label> */}
                    <input id="password" type="password" placeholder="Password" required></input>
                    <br/><br/>
                    <Button buttonName="Login" handleOnClick={this.onLoginClick}>Login</Button><br/><br/>
                    <label className="label"> {this.state.error} </label> <br/><br/> 
                    <a href="/Registration">Registration</a>      
                </div>
            </div>

        )
    }  
}
export default connect() (Login)