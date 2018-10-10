import React from 'react';
import './Button.css'

 export const FormErrors = ({formErrors}) =>
    <div className='formErrors'>
      {Object.keys(formErrors).map((fieldName, i) => 
      {
        if(formErrors[fieldName].length > 0)
        {
          return (
            <label className="label">
              <p key={i}>{fieldName} {formErrors[fieldName]}</p>
            </label>
          )        
        }else 
        {
          return '';
        }
      })}
    </div>