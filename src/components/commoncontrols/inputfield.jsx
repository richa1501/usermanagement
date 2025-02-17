import React from "react";
import "./inputfield.css";
function Inputfield({ name, value, placeholder, type = "text", onChange }) {
  return (

      <div className="mb-4">
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="input-field"
          
        />
      </div>
    );
  }
  
 export default Inputfield;