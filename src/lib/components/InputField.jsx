import React from 'react';

const InputField = ({ 
  label, 
  name, 
  register, 
  required = false, 
  errors = "", 
  type = "text", 
  isTextArea = false 
}) => {
 
  
  return (
    <div style={fieldWrapperStyles}>
      <label style={labelStyles}>{`${label}${required ? "*" : ""}`}</label>
      {isTextArea ? (
        <textarea 
          {...register(name, { required })} 
          style={isTextArea ? textareaStyles : inputStyles} 
        />
      ) : (
        <input 
          {...register(name, { required })} 
          type={type} 
          style={inputStyles} 
        />
      )}
      {
       errors && (
        <span style={errorStyles}>{errors}</span>
      )
      }
    </div>
  );
};

// Styles for the input components
const fieldWrapperStyles = {
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const labelStyles = {
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '6px',
};

const inputStyles = {
  padding: '10px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const textareaStyles = {
  ...inputStyles,
  minHeight: '100px',
};

const errorStyles = {
  color: 'red',
  fontSize: '12px',
  marginTop: '6px',
};

export default InputField;
