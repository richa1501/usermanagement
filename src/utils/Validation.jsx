export const validateForm = (formData, isSignup, isLogin = false, isForgotPassword = false) => {
    let errors = {};
  
    // Email validation (common for all forms)
    if (!formData.email || formData.email.trim() === "") {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        errors.email = "Enter a valid email address";
      }
    }
  
    // Username validation (common for all forms)
    if (!formData.username || formData.username.trim() === "") {
      errors.username = "Username is required";
    }
  
    // Password validation (Signup and Forgot Password)
    if (isSignup || isLogin || isForgotPassword) {
      if (!formData.password || formData.password.trim() === "") {
        errors.password = "Password is required";
      } else {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(formData.password)) {
          errors.password = "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.";
        }
      }
    }
  
    // Confirm Password validation (only for Signup and Forgot Password)
    if (isSignup || isForgotPassword) {
      if (!formData.confirmPassword || formData.confirmPassword.trim() === "") {
        errors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
  
    return errors;
  };
  
  // Real-time input validation
  export const validateInput = (name, value) => {
    let error = "";
  
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        error = "Enter a valid email address";
      }
    }
  
    if (name === "password") {
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(value)) {
        error = "Password must be 8+ chars, include uppercase, number & special char.";
      }
    }
  
    return error;
  };
  