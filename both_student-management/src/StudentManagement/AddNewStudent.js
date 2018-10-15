import React from 'react';
import {FormErrors} from './FormErrors.js'
import { Redirect } from 'react-router-dom';
import '../App.css';
import TeacherHome from './TeacherHome.js';
import {connect} from 'react-redux'
import Button from './Button.js';

class AddNewStudent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={FirstName:" ",LastName:" ",Class:" ",
                    Division:" ",AddressLine1:" ",
                    AddressLine2:" ",pincode:"",
                    firstNameValid:false,
                    lastNameValid:false,
                    classNameValid:false,
                    divisionNmValid: false,
                    addressLine1Valid:false,handleBackCalled:false,
                    pincodeValid:false,formValid:false,
                    ErrButton:"",
                    formErrors:{FirstName:'',LastName:'',Class:'',Division:'',Address:'',PINcode:''}
                    }
        this.handleAddStudent=this.handleAddStudent.bind(this);
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
        let FirstNmValid = this.state.firstNameValid;
        let LastNmValid = this.state.lastNameValid;
        let classValid = this.state.classNameValid;
        let divisionValid = this.state.divisionNmValid;
        let addressValid=this.state.addressLine1Valid;
        let pinValid=this.state.pincodeValid;
        switch(fieldName) 
        {
            case 'FirstName':
                FirstNmValid = value.match(/^[a-zA-Z'. -]+$/);
                fieldValidationErrors.FirstName = FirstNmValid ? '' : ' is invalid';
            break;
            
            case 'LastName':
                LastNmValid = value.match(/^[a-zA-Z'. -]+$/);
                fieldValidationErrors.LastName = LastNmValid ? '' : ' is invalid';
            break;
            
            case 'Class':
                classValid = value.match(/^[a-zA-Z0-9'. -]+$/);
                fieldValidationErrors.Class = classValid ? '' : ' is invalid';
            break;

            case 'Division':
                divisionValid = value.match(/^[a-zA-Z]$/);
                fieldValidationErrors.Division = divisionValid ? '': ' Single Character';
            break;

            case 'AddressLine1':
                addressValid = value.length <= 22;
                fieldValidationErrors.Address = addressValid ? '' : ' Too long use AddressLine2';
            break;

            case 'PIN':
                pinValid = value.length === 6 && value.match(/^[0-9]+$/) ;
                fieldValidationErrors.PINcode= pinValid ? '': 'Check PIN code';
            break;
            
            default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        firstNameValid: FirstNmValid,
                        lastNameValid: LastNmValid,
                        classNameValid:classValid,
                        divisionNmValid:divisionValid,
                        addressLine1Valid:addressValid,
                        pincodeValid:pinValid
                        }, this.validateForm);
    }
    validateForm() 
    {
        this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid &&
             this.state.classNameValid &&this.state.divisionNmValid && this.state.addressLine1Valid &&
             this.state.pincodeValid});        
    }
    errorClass(error) 
    {
        return(error.length === 0 ? '' : 'has-error');
    }
    handleAddStudent()
    {
        const tid   =this.props.teachers.teacherID;
        const fname = this.state.FirstName;
        const lname = this.state.LastName;
        const classs = this.state.Class;
        const division= this.state.Division;
        const line1 = this.state.AddressLine1;
        const line2 = this.state.AddressLine2;
        const pin = document.getElementById("pincode").value;
        if(
            fetch('http://localhost:8080/addStudent?firstName='+fname+
            '&lastName='+lname+'&TeacherID='+tid+'&classs='+classs+'&division='+division+'&line1='+line1 +
            '&line2='+ line2+'&pinCode='+pin,
            {method:'POST',mode:"no-cors"})
            .then(resp => resp)
            .then(findResp => this.setState({data:findResp}))
        )
        this.setState({referrer:'/ListOfStudents'})   
    }
    handleBack()
    {
       // this.props.history.push('/TeacherHome')
       this.setState({handleBackCalled:!this.state.handleBackCalled})
        
    }
    render()
    {
        const{referrer}=this.state;
        const {handleBackCalled}=this.state;
        if(referrer)
            return <Redirect to={referrer}></Redirect>
        if(handleBackCalled)
            return <TeacherHome></TeacherHome>
        return(
            <div className="col-75 ">
                <div className="center">
                     <h2>Add New Student:</h2>
                    <form>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div><br/>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.FirstName)}`}>
                            <input id="firstname" type="text" placeholder="First Name" name="FirstName"  required
                                value={this.state.value} onChange={this.handleUserInput}/>                           
                        </div><br/>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.LastName)}`}>
                            <input id="lastName" type="text" placeholder="last name" name="LastName" required
                                value={this.state.value} onChange={this.handleUserInput} />
                        </div><br/>
                        <div className={`form-group ${this.errorClass (this.state.formErrors.Class)}`}>
                            <input id="class" type="text" placeholder="Class" name="Class" required
                                value={this.state.value} onChange={this.handleUserInput}/>
                        </div><br/>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.Division)}`}>      
                            <input id="division" type="text" placeholder="Division" name="Division" required
                                value={this.state.value} onChange={this.handleUserInput}/>
                        </div><br/>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.Address)}`}>      
                            <input id="address1" type="text" placeholder="Address Line1" name="AddressLine1" required
                                value={this.state.value} onChange={this.handleUserInput}/>
                        </div><br/>
                        <div>      
                            <input id="address2" type="text" placeholder="Address Line2" name="AddressLine2" required
                                value={this.state.value} onChange={this.handleUserInput}/>
                        </div><br/>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.PINcode)}`}>      
                            <input id="pincode" type="text" placeholder="PIN code" name="PIN" required
                                value={this.state.value} onChange={this.handleUserInput}/>
                        </div><br/>
                        <Button buttonName="Add Student" handleOnClick={this.handleAddStudent} disabled={!this.state.formValid} />
                        <Button buttonName="Back" handleOnClick={this.handleBack}/> 
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        teachers:state.LoginReducer[0]
    }
  }
export default connect (mapStateToProps) (AddNewStudent);