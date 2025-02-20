import React, { useState } from "react";
import Inputfield from "../commoncontrols/Inputfield";
import Button from "../commoncontrols/Button";
import "./LoginSignup.css";
import { useNavigate, Link } from "react-router-dom";
import { validateForm, validateInput } from "../../utils/Validation";


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
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Handles input changes dynamically
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value

    }));
    const error =validateInput (name,value);
    setErrors((prevErrors)=> ({...prevErrors,[name]:error}));
  };
  // Handle form submisssion
  const handleSubmit = (event) => {
    console.log(formData, "formData");
    // Authenticate user login 
    event.preventDefault();
     // Validate form data
     const formValidation = validateForm(formData, !isLogin, false);
     setErrors(formValidation);
 
     // If there are validation errors, prevent submission
     if (Object.keys(formValidation).length > 0) {
       setMessage("Please correct the errors before submitting.");
       return;
     }
    if (isLogin) {
      console.log("login sucessful")
    }
    else {
      console.log("error")
    }
    // Reset form after successful submission
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
    navigate("home");
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
    // If form is invalid disable submit button 
    const isFormValid = Object.values(errors).every((err) => err === "") &&
    Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div className="form-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Dynamically render input fields */}
        {Inputfields.map((field) => (
          <div>
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

        <Button type="submit" text={isLogin ? "Login" : "Sign Up"} variant="outline" disabled={!isFormValid}  />
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


