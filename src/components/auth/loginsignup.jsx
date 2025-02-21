import React, { useState } from "react";
import Inputfield from "../commoncontrols/Inputfield";
import Button from "../commoncontrols/Button";
import "./LoginSignup.css";
import { useNavigate, Link } from "react-router-dom";
import {validateForm} from "../../utils/Validation";



function LoginSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false
  });
   const [errors,setErrors]=useState({});
   //const [message,setMessage]= useState("");

  // Handles input changes dynamically
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value

    }));
    
  };
  // Handle form submisssion
  const handleSubmit = (event) => {
    // Authenticate user login 
    event.preventDefault();
    console.log(formData, "formData");   
    const errors = validateForm(formData, !isLogin);
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      setErrors(errors);
      return;
    }
      // Simulate signup success
      console.log( isLogin? "Login Sucessfull":"Signup successful");
      //setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        setIsLogin(!isLogin); // Switch to login form
        navigate(isLogin?"home":"/"); // Redirect to login page
      },isLogin?0:500); // Delay to show success message before navigation
  
  
   
   
  };

  // Conditionaly Renders Array for input fields for login or signup
  const Inputfields = isLogin ? [

    { name: "email", placeholder: "Enter your Email", type: "email" },
    { name: "password", placeholder: "Enter your Password", type: "password" }
  ] :
    [
      { name: "username", placeholder: "Enter your name", type: "text" },
      { name: "email", placeholder: "Enter your Email", type: "email" },
      { name: "password", placeholder: "Enter your Password", type: "password" },
      { name: "confirmPassword", placeholder: "Re-enter your Password", type: "password" }
    ];
    

  return (
    <div className="form-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Dynamically render input fields */}
        {Inputfields.map((field) => (
       <div key={field.name}>
          <Inputfield
            key={field.name}
            name={field.name}
            value={formData[field.name]}
            placeholder={field.placeholder}
            type={field.type || "text"} // Default to "text" if no type is specified
            onChange={handleChange}
          />
          {errors[field.name] && <p className="error-text">{errors[field.name]}</p>}
   
          </div>
        ))}
        {isLogin && (
          <div className="addfield">
            <label>
            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
              Remember Me
            </label>
            <Link to="/ForgotPassword" className="forgot-password">Forgot Password?</Link>
          </div>
        )}

        <Button type="submit" text={isLogin ? "Login" : "Sign Up"} variant="outline" />
      </form>
      <p className="toggle-link">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <Link to="#" onClick={() => setIsLogin(false)}>Sign Up</Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link to="#" onClick={() => setIsLogin(true)}>Login</Link>
          </>
        )}
      </p>
    </div>
  );
}

export default LoginSignup;


