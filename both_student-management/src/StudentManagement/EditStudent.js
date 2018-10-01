import React from 'react';
import InputBox from './InputBox';
import Button from './Button';
import '../App.css';
import { Redirect } from 'react-router-dom';
//import Axios from 'axios';

class EditStudent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={studentId:this.props.studentToUpdate.studentId,
                    FirstName:this.props.studentToUpdate.firstName,
                    LastName:this.props.studentToUpdate.lastName,
                    Class:this.props.studentToUpdate.studentClass,
                    Division:this.props.studentToUpdate.division,
                    AddressLine1: this.props.studentToUpdate.addressLine1,
                    AddressLine2: this.props.studentToUpdate.AddressLine2,
                    pincode:this.props.studentToUpdate.pincode,
                    firstNameValid:false,
                    lastNameValid:false,
                    divisionValid: false,
                    addressLine1Valid:false,
                    pincodeValid:false,
                    ErrfirstName:" ",ErrlastName:" ",ErrClass:"",Errdivision:" ",
                    ErraddressLine1:" ",Errpincode:"",ErrButton:""
                    }
        this.handleEditStudent=this.handleEditStudent.bind(this);
        this.handleFirstNameChange=this.handleFirstNameChange.bind(this);
        this.handleLastNameChange=this.handleLastNameChange.bind(this);
        this.handleClassChange=this.handleClassChange.bind(this);
        this.handleDivisionChange=this.handleDivisionChange.bind(this);
        this.handleAddressLine1Change=this.handleAddressLine1Change.bind(this);
        this.handleAddressLine2Change=this.handleAddressLine2Change.bind(this); 
        this.handlePincodeChange=this.handlePincodeChange.bind(this);
        this.handleBack=this.handleBack.bind(this);
    }
    componentWillMount()
    {
        
    }
    componentDidMount()
    {
        // const {FirstName} = this.props
        // this.setState({FirstName:FirstName})
    }
   /*studentToUpdate(student){
        this.setState({studentData:this.props.ListOfStudents.student})
        this.setState({studentID:this.state.student.studentID})
    }*/
    handleFirstNameChange(value)
    { 
        let FirstNmValid = this.state.firstNameValid;
        if(value!=="")
        {
            FirstNmValid = value.match(/^[a-zA-Z]+$/);
            this.setState({ErrfirstName:FirstNmValid ? '' : ' Only letters'});
            this.setState({FirstName: value});
        }
        else{
            this.setState({ErrfirstName:"*First Name is required"});
        }
    }
    handleLastNameChange(value)
    {
        let LastNmValid = this.state.lastNameValid;
        if(value!=="")
        {
            LastNmValid = value.match(/^[a-zA-Z]+$/);
            this.setState({ErrlastName:LastNmValid ? '' : '  Only letters'});
            this.setState({LastName: value});
        }
        else{
            this.setState({ErrlastName:"*Last Name is required"});
        }

    }
    handleClassChange(value)
    { 
        let classNmValid=this.state.classNameValid;
        if(value!=="")
        {
            classNmValid=value.match(/^[a-zA-Z0-9]+$/);
            this.setState({ErrClass:classNmValid? '' : 'Invalid'});
            this.setState({Class: value});
        }
        else{
            this.setState({ErrClass:"*Class is required"});
        }
    }
    handleDivisionChange(value)
    {
        let divVlid=this.state.divisionValid;
        if(value!=="")
        {
            divVlid=value.match(/^[a-zA-Z]$/);
            this.setState({Errdivision:divVlid? '':'Only single character'});
            this.setState({Division: value});
            
        }
        else{
            this.setState({Errdivision:"*Division is required"});
        }
    }
    handleAddressLine1Change(value)
    {
        let addressLine1Valid=this.state.addressLine1Valid;
        if(value!=="")
        {
            addressLine1Valid = value.length <= 22;
            this.setState({ErraddressLine1:addressLine1Valid ? '' : ' Too long use Line2'});
            this.setState({AddressLine1: value});
        }
        else{
            this.setState({ErraddressLine1:"*Address is required"});
        }
    }
    handleAddressLine2Change(value)
    {
        this.setState({AddressLine2: value});
    }
    handlePincodeChange(value)
    {
        let pincodeValid = this.state.pincodeValid;
        if(value!=="")
        {
            pincodeValid = value.match(/^[0-9]+$/);
            this.setState({Errpincode:pincodeValid ? '' : '  Only numbers'});
            this.setState({pincode: value});
        }
        else{
            this.setState({Errpincode:"*PIN Code is required"});
        }
    }
    handleEditStudent()
    {
        const id=this.props.studentToUpdate.studentId;console.log(id);
        const tid=this.props.studentToUpdate.teacherId;console.log(tid);
        const fname = this.state.FirstName;  console.log(fname);
        const lname = this.state.LastName; console.log(lname);
        const classs = this.state.Class; console.log(classs);
        const division= this.state.Division; console.log(division);
        const line1 = this.state.AddressLine1; console.log(line1);
        const line2 = this.state.AddressLine2; console.log(line2);
        const pin = this.state.pincode; console.log(pin);
        if(this.state.FirstName!=="" && this.state.LastName!==""&&this.state.Class!=="" && this.state.Division!==""&&this.state.AddressLine1!=="" && this.state.pincode!=="")
        {
           if(fetch('http://localhost:8080/updateStudent?id='+id+'&firstName='+fname+
            '&lastName='+lname+'&TeacherId='+tid+'&classs='+classs+'&division='+division+'&line1='+line1 +
            '&line2='+line2+'&pinCode='+pin,
            {method:'GET',mode:"no-cors"})
            .then(resp => resp)
            .then(findResp => this.setState({data:findResp}))
           ){
            alert("Updated "+ this.state.FirstName);
            this.setState({referrer:'/ListOfStudents'})   
           }
            
        }
        else
        {
            this.setState({ErrButton:"Please fill the above fields"})
        }
    }
    handleBack()
    {
       // this.props.history.push('/ListOfStudents');
       this.setState({referrer:'/ListOfStudents'})
    }
    render()
    {
        const {referrer} = this.state;
        if (referrer) return (<Redirect to={referrer} />);
        return(
            <div className="col-75 ">
            <div className="center">
            <h2> Student To be edit:  {this.props.studentToUpdate.firstName} </h2>
            </div> 
                <form>

                    <InputBox inputType="text"  placeholder="First Name"    value={this.props.studentToUpdate.firstName}    
                              handleChanges={this.handleFirstNameChange}    Name="firstName"   error={this.state.ErrfirstName} /><br></br> 
                    <InputBox inputType="text"  placeholder="Last Name"     value={this.props.studentToUpdate.lastName}     
                              handleChanges={this.handleLastNameChange}     Name="lastName"    error={this.state.ErrlastName} /><br></br>           
                    <InputBox inputType="text"  placeholder="Class"         value={this.props.studentToUpdate.studentClass}        
                              handleChanges={this.handleClassChange}        Name="class"       error={this.state.ErrClass} /><br></br>           
                    <InputBox inputType="text"  placeholder="Division"      value={this.props.studentToUpdate.division}     
                              handleChanges={this.handleDivisionChange}     Name="division"    error={this.state.Errdivision} /><br></br>           
                    <InputBox inputType="text"  placeholder="Address Line1" value={this.props.studentToUpdate.addressLine1} 
                              handleChanges={this.handleAddressLine1Change} Name="addressLine1"error={this.state.ErraddressLine1} /><br></br>           
                    <InputBox inputType="text"  placeholder="Address Line2" value={this.props.studentToUpdate.addressLine2} 
                              handleChanges={this.handleAddressLine2Change} Name="addressLine2"                                   /><br></br>           
                    <InputBox inputType="text"  placeholder="PIN code"      value={this.props.studentToUpdate.pincode}      
                              handleChanges={this.handlePincodeChange}      Name="pincode"     error={this.state.Errpincode} /><br></br>           
                    <Button buttonName="Edit Student" handleOnClick={this.handleEditStudent} error={this.state.ErrButton}/>
                    <Button buttonName="Back" handleOnClick={this.handleBack}/>
                </form>   
            </div>
        );
    }
}
export default EditStudent;