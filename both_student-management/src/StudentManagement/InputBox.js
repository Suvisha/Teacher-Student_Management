import React from 'react';
import './Button.css'

class InputBox extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    };
     handleOnChange(e) 
    {
         this.props.handleChanges(e.target.value);    
    }
    render()
    {
        return(      
            <div >     
                <div>
                    <input type={this.props.inputType} placeholder= {this.props.placeholder} onBlur={this.handleOnChange} name={this.props.Name}  required/>
                </div>
                <div> <label className="label"> {this.props.error} </label></div>
            </div>
        );
    }
}
export default InputBox;