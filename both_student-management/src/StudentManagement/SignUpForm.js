import React, { Component } from 'react';
import {FormErrors} from './FormErrors.js'
// import Button from './Button';
import { Redirect } from 'react-router-dom';

class SignUpForm extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
        FirstName:'',
        LastName:'',
        userNm:'',
        passWord:'',
        FirstNmValid: false,
        LastNameValid:false,
        UserNameValid:false,
        PasswordValid:false,
        formErrors:{FirstName:'',LastName:'',userNm:'',passWord:''},
        formValid:false
    }
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleBack=this.handleBack.bind(this);
  }
  handleUserInput = (e) => 
  {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
  validateField(fieldName,value)
  {
    let fieldValidationErrors = this.state.formErrors;
    let FirstNmValid = this.state.FirstNmValid;
    let LastNameValid = this.state.LastNameValid;
    let UserNameValid = this.state.UserNameValid;
    let PasswordValid = this.state.passwordValid;
      switch(fieldName) 
      {
        case 'FirstName':
            FirstNmValid = value.match(/^[a-zA-Z]+$/);
            fieldValidationErrors.FirstName = FirstNmValid ? '' : ' is invalid';
          break;
        
        case 'LastName':
            LastNameValid = value.match(/^[a-zA-Z]+$/);
            fieldValidationErrors.LastName = LastNameValid ? '' : ' is invalid';
          break;
        
        case 'userNm':
          UserNameValid = value.match(/^[a-zA-Z0-9]+$/);
          fieldValidationErrors.userNm = UserNameValid ? '' : ' is invalid';
        break;
        
        case 'passWord':
          PasswordValid = value.length >= 6;
          fieldValidationErrors.passWord = PasswordValid ? '': ' is too short';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      FirstNmValid: FirstNmValid,
                      LastNameValid:LastNameValid,
                      UserNameValid:UserNameValid,
                      PasswordValid:PasswordValid
                    }, this.validateForm);
  }
  validateForm() 
  {
    this.setState({formValid: this.state.FirstNmValid && this.state.LastNameValid && this.state.UserNameValid &&this.state.PasswordValid});
  }
  errorClass(error) 
  {
    return(error.length === 0 ? '' : 'has-error');
  }
  handleBack()
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
      <form className="RegistrationPage">
        <h2>Register here</h2>
        <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.FirstName)}`}>
            <label htmlFor="_FirstName">First Name &nbsp;&nbsp;: </label>
            <input id="name" type="text" size="15" placeholder="First Name" name="FirstName"  required
                value={this.state.value} onChange={this.handleUserInput}/>                           
        </div><br/>
        <div className={`form-group ${this.errorClass(this.state.formErrors.LastName)}`}>
            <label htmlFor="_LastName">Last Name&nbsp;&nbsp;&nbsp;: </label>
            <input id="lastName" type="text" size="15" placeholder="last name" name="LastName" required
                value={this.state.value} onChange={this.handleUserInput} />
        </div><br/>
        <div className={`form-group ${this.errorClass (this.state.formErrors.userNm)}`}>
            <label htmlFor="_UserName">User Name &nbsp;: </label>
            <input id="user" type="text" size="15" placeholder="User Name" name="userNm" required
                value={this.state.value} onChange={this.handleUserInput}/>
        </div><br/>
        <div className={`form-group ${this.errorClass(this.state.formErrors.passWord)}`}>      
            <label htmlFor="_password">Password&nbsp;&nbsp;&nbsp;&nbsp;: </label>
            <input id="pass_word" type="password" size="15" placeholder="New password" name="passWord" required
                value={this.state.value} onChange={this.handleUserInput}/>
        </div> <br/><br/>
        <button type="submit" onClick={this.props.onSubmitClick} disabled={!this.state.formValid}>Sign up</button>    <br/><br/>
        <button type="submit" onClick={this.handleBack}>Back</button>   
        {/* <Button buttonName="Home" handleOnClick={this.handleBack}/> */}
      
      </form>
    )
  }
}

export default SignUpForm;