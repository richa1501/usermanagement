
export const validateForm = (formData, isSignup) => {
  let errors = {};

  // Check email
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format.";
  }

  // Check password
  if (!formData.password.trim()) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  // Additional validations for Signup
  if (isSignup) {
    if (!formData.username.trim()) {
      errors.username = "Username is required.";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
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
  