import React from 'react';
import InputBox from './InputBox';
import Button from './Button';
import '../App.css';
import ListOfStudents from './ListOfStudents';

class EditStudent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
                    FirstName:"",LastName:"",Class:"",
                    Division:"",AddressLine1:"",
                    AddressLine2:"",pincode:"",
                    firstNameValid:false,
                    lastNameValid:false,
                    classNameValid:false,
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
        //this.studentToUpdate=this.studentToUpdate.bind(this)
    }
    componentDidMount()
    {
       
    }
    /*studentToUpdate(student)
    {
        this.setState({studentData:this.props.ListOfStudents.student})
        this.setState({studentID:this.state.student.studentID})
    }*/
    handleFirstNameChange(value,event)
    {
        let FirstNmValid = this.state.firstNameValid;
        if(value!=="")
        {
            FirstNmValid = value.match(/^[a-zA-Z'. -]+$/);
            this.setState({ErrfirstName:FirstNmValid ? '' : 'Only a-zA-Z\'. -'});
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
            LastNmValid = value.match(/^[a-zA-Z'. -]+$/);
            this.setState({ErrlastName:LastNmValid ? '' : ' Only a-zA-Z\'. -'});
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
            if(this.state.Errpincode==='')
            {
                this.setState({pincode: value});
            }
            
        }
        else if(value==="")
        {
            this.setState({Errpincode:"*PIN Code is required"});
        }
    }
    render()
    {
        <ListOfStudents updateStudentIDinEditStudent={this.studentToUpdate}/>
        return(
            <div className="col-75 ">
            <h3> edit: </h3>
                <div className="center">
                    <form>
                        <InputBox inputType="text"  placeholder="First Name"    handleChanges={this.handleFirstNameChange}    Name="firstName"   error={this.state.ErrfirstName} /><br></br> 
                        <InputBox inputType="text"  placeholder="Last Name"     handleChanges={this.handleLastNameChange}     Name="lastName"    error={this.state.ErrlastName} /><br></br>           
                        <InputBox inputType="text"  placeholder="Class"         handleChanges={this.handleClassChange}        Name="class"       error={this.state.ErrClass} /><br></br>           
                        <InputBox inputType="text"  placeholder="Division"      handleChanges={this.handleDivisionChange}     Name="division"    error={this.state.Errdivision} /><br></br>           
                        <InputBox inputType="text"  placeholder="Address Line1" handleChanges={this.handleAddressLine1Change} Name="addressLine1"error={this.state.ErraddressLine1} /><br></br>           
                        <InputBox inputType="text"  placeholder="Address Line2" handleChanges={this.handleAddressLine2Change} Name="addressLine2"                                   /><br></br>           
                        <InputBox inputType="text"  placeholder="PIN code"      handleChanges={this.handlePincodeChange}      Name="pincode"     error={this.state.Errpincode} /><br></br>           
                        <Button buttonName="Edit Student" handleOnClick={this.handleEditStudent} error={this.state.ErrButton}/>
                        <Button buttonName="Back" handleOnClick={this.handleBack}/>
                    </form>
                </div>
            </div>
        );
    }
    handleEditStudent()
    {
        const fname = this.state.FirstName; 
        const lname = this.state.LastName;
        const classs = this.state.Class;
        const division= this.state.Division;
        const line1 = this.state.AddressLine1;
        const line2 = this.state.AddressLine2;
        const pin = this.state.pincode;
        if(this.state.FirstName!=="" && this.state.LastName!==""&&this.state.Class!=="" && this.state.Division!==""&&this.state.AddressLine1!=="" && this.state.pincode!=="")
        {
           if(
               fetch('http://localhost:8080/updateStudent?firstName='+fname+
            '&lastName='+lname+'&TeacherID='+1+'&classs='+classs+'&division='+division+'&line1='+line1 +
            '&line2='+ line2+'&pinCode='+pin,
            {method:'GET',mode:"no-cors"})
            .then(resp => resp)
            .then(findResp => this.setState({data:findResp}))
           ){
            alert("Updated "+ this.state.FirstName);
            this.props.history.push('/ListOfStudents');   
           }
            
        }
        else
        {
            this.setState({ErrButton:"Please fill the above fields"})
        }
    }
    handleBack()
    {
        this.props.history.push('/ListOfStudents');
    }
}
export default EditStudent;