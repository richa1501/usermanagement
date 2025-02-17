import React, { useState } from "react";
import Inputfield from "../commoncontrols/inputfield";
import Button from "../commoncontrols/button";
import "./LoginSignup.css";
import { useNavigate, Link } from "react-router-dom";


function LoginSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: "false"
  });

  // Handles input changes dynamically
  const handleChange = (e) => {
    const { name, value, type, check } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? check : value,

    }));
  };
  // Handle form submisssion
  const handleSubmit = (event) => {
    console.log(formData, "formData");
    // Authenticate user login 
    event.preventDefault();
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

  return (
    <div className="form-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Dynamically render input fields */}
        {Inputfields.map((field) => (
          <Inputfield
            key={field.name}
            name={field.name}
            value={formData[field.name]}
            placeholder={field.placeholder}
            type={field.type || "text"} // Default to "text" if no type is specified
            onChange={handleChange}
          />
        ))}
        {isLogin && (
          <div className="addfield">
            <label>
              <input type="checkbox" name="rememberMe" check={formData.rememberMe} onChange={handleChange} />
              Remember Me
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
        )}

        <Button
          type="submit" text={isLogin ? "Login" : "Sign Up"} variant="outline" />
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


