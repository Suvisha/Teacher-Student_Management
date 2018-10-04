import React from 'react';
//import InputBox from './InputBox';
import {FormErrors} from './FormErrors.js'
// import Button from './Button';
import { Redirect } from 'react-router-dom';
import '../App.css';

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
                    addressLine1Valid:false,
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
                // if(fieldValidationErrors.FirstNm==='')
                // this.setState({FirstName: value});
            break;
            
            case 'LastName':
                LastNmValid = value.match(/^[a-zA-Z]+$/);
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
        //const tid=this.props.teacherId;
        const fname = this.state.FirstName;
        const lname = this.state.LastName;
        const classs = this.state.Class;
        const division= this.state.Division;
        const line1 = this.state.AddressLine1;
        const line2 = this.state.AddressLine2;
        const pin = this.state.pincode;
        if(
            fetch('http://localhost:8080/addStudent?firstName='+fname+
            '&lastName='+lname+'&TeacherID='+1+'&classs='+classs+'&division='+division+'&line1='+line1 +
            '&line2='+ line2+'&pinCode='+pin,
            {method:'GET',mode:"no-cors"})
            .then(resp => resp)
            .then(findResp => this.setState({data:findResp}))
        )
        this.setState({referrer:'/ListOfStudents'})   
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
                        <button type="submit" onClick={this.handleAddStudent} disabled={!this.state.formValid}>Add New Student</button>    <br/><br/>
                        <button type="submit" onClick={this.handleBack}>Back</button>   
                    </form>
                </div>
            </div>
        );
    }
}
export default AddNewStudent;


// handleFirstNameChange(value)
// {
//     let FirstNmValid = this.state.firstNameValid;
//     if(value!=="")
//     {
//         FirstNmValid = value.match(/^[a-zA-Z'. -]+$/);
//         this.setState({ErrfirstName:FirstNmValid ? '' : 'Only: letters\' . -'});
//         this.setState({FirstName: value});
//         this.setState({FirstNmValid: FirstNmValid},this.handleformvalid);
//     }
//     else{
//         this.setState({ErrfirstName:"*First Name is required"});
//     }

// }
// handleLastNameChange(value)
// {
//     let LastNmValid = this.state.lastNameValid;
//     if(value!=="")
//     {
//         LastNmValid = value.match(/^[a-zA-Z'. -]+$/);
//         this.setState({ErrlastName:LastNmValid ? '' : ' Only: letters\' . -'});
//         this.setState({LastName: value});
//         this.setState({LastNameValid: LastNmValid},this.handleformvalid);
//     }
//     else{
//         this.setState({ErrlastName:"*Last Name is required"});
//     }
// }
// handleClassChange(value)
// {
//     let classNmValid=this.state.classNameValid;
//     if(value!=="")
//     {
//         classNmValid=value.match(/^[a-zA-Z0-9'. -]+$/);
//         this.setState({ErrClass:classNmValid? '' : 'Only: letters\' . - 0-9'});
//         this.setState({Class: value});
//         this.setState({classNameValid: classNmValid},this.handleformvalid);
//     }
//     else{
//         this.setState({ErrClass:"*Class is required"});
//     }
// }
// handleDivisionChange(value)
// {
//     let divValid=this.state.divisionValid;
//     if(value!=="")
//     {
//         divValid=value.match(/^[a-zA-Z]$/);
//         this.setState({Errdivision:divValid? '':'Only single character'});
//         this.setState({Division: value});
//         this.setState({divisionValid: divValid},this.handleformvalid);
//     }
//     else{
//         this.setState({Errdivision:"*Division is required"});
//     }
// }
// handleAddressLine1Change(value)
// {
//     let addressValid=this.state.addressLine1Valid;
//     if(value!=="")
//     {
//         addressValid = value.length <= 22;
//         this.setState({ErraddressLine1:addressValid ? '' : ' Too long use Line2'});
//         this.setState({AddressLine1: value});
//         this.setState({addressLine1Valid: addressValid},this.handleformvalid);
//     }
//     else{
//         this.setState({ErraddressLine1:"*Address is required"});
//     }
// }
// handleAddressLine2Change(value)
// {
//     this.setState({AddressLine2: value});
// }
// handlePincodeChange(value)
// {
//     let pinValid = this.state.pincodeValid;
//     if(value!=="")
//     {
//         pinValid = value.match(/^[0-9]+$/);
//         this.setState({Errpincode:pinValid ? '' : '  Only numbers'});
//         this.setState({pincode: value});
//         this.setState({pincodeValid: pinValid},this.handleformvalid);
//     }
//     else{
//         this.setState({Errpincode:"*PIN Code is required"});
//     }
// }
// handleformvalid()
// {
//     this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid &&
//          this.state.classNameValid &&this.state.divisionValid &&this.state.addressLine1Valid &&
//          this.state.pincodeValid});
//          console.log("sdf" +!this.state.formValid);
// }
// 
// handleBack()
// {
//     this.props.history.push('/TeacherHome');
// }














//  <InputBox inputType="text"  placeholder="First Name"    handleChanges={this.handleFirstNameChange}    Name="firstName"   error={this.state.ErrfirstName} /><br></br> 
// <InputBox inputType="text"  placeholder="Last Name"     handleChanges={this.handleLastNameChange}     Name="lastName"    error={this.state.ErrlastName} /><br></br>           
// <InputBox inputType="text"  placeholder="Class"         handleChanges={this.handleClassChange}        Name="class"       error={this.state.ErrClass} /><br></br>           
// <InputBox inputType="text"  placeholder="Division"      handleChanges={this.handleDivisionChange}     Name="division"    error={this.state.Errdivision} /><br></br>           
// <InputBox inputType="text"  placeholder="Address Line1" handleChanges={this.handleAddressLine1Change} Name="addressLine1"error={this.state.ErraddressLine1} /><br></br>           
// <InputBox inputType="text"  placeholder="Address Line2" handleChanges={this.handleAddressLine2Change} Name="addressLine2"                                   /><br></br>           
// <InputBox inputType="text"  placeholder="PIN code"      handleChanges={this.handlePincodeChange}      Name="pincode"     error={this.state.Errpincode} /><br></br>           
// <button type="submit" onClick={this.handleAddStudent } disabled={!this.state.formValid}>new student</button>   
// {/* <Button buttonName="Add Student" handleOnClick={this.handleAddStudent } error={this.state.ErrButton} disable={!this.state.formValid}/> */}
// <Button buttonName="Back" handleOnClick={this.handleBack } />
