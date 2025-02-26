import React, { useState } from "react";
import Inputfield from "../commoncontrols/Inputfield";
import Button from "../commoncontrols/Button";
import "./LoginSignup.css";
import { useNavigate, Link } from "react-router-dom";
import { validateInput } from "../../utils/Validation";

function LoginSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    // Validation - using validateInput for each field
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateInput(key, formData[key], formData);
      if (error) {
        formErrors[key] = error;
      }
    });

    // Check if there are any validation errors
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Simulate login/signup success
    console.log(isLogin ? "Login Successful" : "Signup Successful");

    setTimeout(() => {
      setIsLogin(!isLogin); // Switch to the other form (login/signup)
      navigate(isLogin ? "/home" : "/");
    }, isLogin ? 0 : 500); // Delay to show success message before navigation
  };

  // Conditional render input fields for login or signup
  const inputFields = isLogin
    ? [
        { name: "email", placeholder: "Enter your Email", type: "email" },
        { name: "password", placeholder: "Enter your Password", type: "password" },
      ]
    : [
        { name: "username", placeholder: "Enter your name", type: "text" },
        { name: "email", placeholder: "Enter your Email", type: "email" },
        { name: "password", placeholder: "Enter your Password", type: "password" },
        { name: "confirmPassword", placeholder: "Re-enter your Password", type: "password" },
      ];

  // Check form validity
  const isFormValid =
    Object.values(errors).every((error) => error === "") &&
    Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div className="form-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit}>
        {/* Dynamically render input fields */}
        {inputFields.map((field) => (
          <div key={field.name}>
            <Inputfield
              name={field.name}
              value={formData[field.name]} // Pass the correct value for each field
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={field.placeholder}
              type={field.type || "text"} // Default to "text" if no type is specified
            />
            {(touchedFields[field.name] || isSubmitted) && errors[field.name] && (
              <p className="error-text">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {isLogin && (
          <div className="addfield">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember Me
            </label>
            <Link to="/ForgotPassword" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          text={isLogin ? "Login" : "Sign Up"}
          variant="outline"
          disabled={!isFormValid} // Button disabled if the form is invalid
        />
      </form>

      <p className="toggle-link">
        {isLogin ? (
          <>
            Don't have an account? <Link to="#" onClick={() => setIsLogin(false)}>Sign Up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link to="#" onClick={() => setIsLogin(true)}>Login</Link>
          </>
        )}
      </p>
    </div>
  );
}

export default LoginSignup;
