import React,{Component} from 'react'
import SignUpForm from './SignUpForm'

export default class Registration extends Component{
    constructor(props){
        super(props);
        this.state = {
            FirstName:'',
            LastName:'',
            userNm:'',
            passWord:'',
            msgErr:'Not registered???',
            fields:{},
            formErrors:{FirstName:'',LastName:'',userNm:'',passWord:''},
            formValid:false
        }
    }

    validateFirstName = (First_name) =>{
        let firstNameIsValid= false;
        let msg ="";
        let invalid_Length = "length should not exceed 10 letters";
        let invalid_Input = "Only Letters allowed"
       var isRequired = document.getElementById('name').required    
        if(isRequired && First_name !== ""){
            if(First_name.length > 10) {
                msg = invalid_Length;
            }else if(First_name.match(/^[a-zA-Z]+$/)){
                firstNameIsValid = true;
                this.setState({FirstName : First_name});
            }else {
                msg = invalid_Input;
            }
         }
         return msg;
    }
    validateLastName = (Last_name) =>
    {
        let lastNameIsValid = false;
        let msg ="";
        var isRequired = document.getElementById('lastName').required    
        if(isRequired && Last_name !== ""){
            if(Last_name.length > 10) {
                msg = "length should not exceed 10 letters";
            }else if(Last_name.match(/^[a-zA-Z]+$/)){
                lastNameIsValid = true;
                this.setState({LastName : Last_name});
            }else {
                msg = "Only Letters allowed"
            }
         }
         return lastNameIsValid;
    }
    validatePassword = (passWord) =>{
        let msg=""
        var isRequired = document.getElementById('pass_word').required 
        if(isRequired && passWord !==""){
            if(passWord.length < 6){
                msg = "password must contain atleast 6 digits"
               
            }/*else{
                passwordIsValid = true
                this.setState({passWord:passWord });
            } */
        }
        return msg;
            
    }
    validateUserName = (user_Name) =>{
        let msg=""
        var isRequired = document.getElementById('user').required 

        if(isRequired && user_Name!==""){
            if(!user_Name.match(/^[a-zA-Z]+$/)){
                msg="user name should be alphanumeric";
            }
        }
        //this.finalValid(userNameIsValid,msg);
        return msg;
    }
    
   /* onSubmitClick = () => {
        let msg =[];
        
        const First_name = document.getElementById("name");
        const last_name = document.getElementById("lastName");
        const userNm = document.getElementById("user");
        const passWord = document.getElementById("pass_word");
        let hasError = true;
        const validFirstNameMsg = this.validateFirstName(First_name.value)
        const validpassMsg  = this.validatePassword(passWord.value)
        if (this.validatePassword(passWord.value) === "") {
            hasError = false;
            msg.push(validpassMsg);
        }
        if (this.validateFirstName(First_name.value) === "") {
            hasError = false;
            msg.push(validFirstNameMsg);
        }
        
        /*if(this.validateFirstName(First_name.value) && this.validateLastName(last_name.value) && this.validateUserName(userNm.value) && this.validatePassword(passWord.value)){
            alert("valid form")
        }else{
            if(this.validateUserName(userNm.value)===false){
                
                this.setState({msg:"user name should be alphanumeric"})
            }
            alert("Form has errors")
        }
        if(!hasError) {
            this.setState({passWord: passWord.value });
        } else {
            this.setState({msgErr: msg});
        }
        
}*/
    onSubmitClick   =   ()  =>{
        const First_name = document.getElementById("name").value;
        alert(`${First_name} added`);
    }
    render(){
        return(
                <div>
                    <SignUpForm onSubmitClick={this.onSubmitClick}></SignUpForm>
                   
                </div>
        )
    }
}

/*
<label>First Name: </label>
<input id="name" type="text" size="10" placeholder="First Name" required/> 
 <p className="error hide name" value="Specify Value in this field"></p>
<br/>
<label>Last Name: </label>
<input id="lastName" type="text" size="10" placeholder="last name" required="true" />
<p className="error hide" value="only letters"/>

<label>User Name:</label>
<input id="userName" type="text" size="30" placeholder="User Name" required="true"/>
<br/>
<label>Password  :   </label>
<input id="password" type="password" size="30" placeholder="New password" required="true" onChange={this.handlePassword} />
<br/>
<label>Confirm Password:</label>
<input id="confirmPass" type="password" size="30" placeholder="Re-write password" required="true" />
<br />
*/