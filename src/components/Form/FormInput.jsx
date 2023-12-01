import { useState } from 'react'
import './Input.css'

const FormInput = (props) => {

  const [focused, setFocused] = useState(false);
  const {label, errorMessages, onChange, id, placeholder, ...inputProps} = props;

  const handelFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className='formInput'>
        <label>{label}</label>
        <input {...inputProps} onChange={onChange} placeholder={placeholder} onBlur={handelFocus} focused={focused.toString()} />
        <span className='error'>{errorMessages}</span>
        
    </div>
  );
};

export default FormInput