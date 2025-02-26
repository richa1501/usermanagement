/*const regex = {
  email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,    
  password:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};
export class Validator {
  static required(value, message = "This field is required") {
    return value && value.toString().trim().length >0
      ? {error: true, message }
      : {error: false};
  }
  static username(value, message = "Username must be at least 3 characters long") {
    return !value && value.length >= 3
      ? { error: true, message}
      : { error: false  };
  }

  static email(value, message = "Invalid email format") {    
    if (!value) return this.required(value);
    return regex.email.value
      ? { error: false }
      : { error: true, message };
  }

  static password(
    value,
    message = "Password must be at least 8 characters, contain an uppercase letter, a number, and a special character"
  ) {
    if (!value) return this.required(value);
    return regex.password.value
      ? { error: false }
      : { error: true, message };
  }

  static confirmPassword(password, confirmPassword, message = "Passwords do not match") {
       if (!confirmPassword) return this.required(confirmPassword)
        return password === confirmPassword
      ? { error: false }
      : { error: true, message };
  }

  
}
  
   // Real-time input validation with Reusable validateInput function using Validator class
export const validateInput = (name, value,formData={}) => {
  let error = "";

  switch (name) {
    case "email":
      error = Validator.email(value).error ? Validator.email(value).message : "";
      break;

    case "password":
      error = Validator.password(value).error ? Validator.password(value).message : "";
      break;

    case "username":
      error = Validator.username(value).error ? Validator.username(value).message : "";
      break;

    case "confirmPassword":
      error = Validator.confirmPassword(formData.password, value).error
        ? Validator.confirmPassword(formData.password, value).message
        : "";
      break;

    default:
      error = Validator.required(value).error ? Validator.required(value).message : "";
      break;
  }

  return error;
};*/
export const validateInput = (name, value = "", formData = {}) => {
  //const stringValue = value ? String(value) : "";
  const regex = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    username: /^[a-zA-Z0-9_-]{3,16}$/, // 3-16 characters (no special chars)
  };


  if (name !== 'rememberMe' && !value.trim()) {
    return `This ${name} is required`; // Required field validation
  }
  if (name === "email" && !regex.email.test(value)) {
    return "Invalid email format";
  }

  if (name === "password" && !regex.password.test(value)) {
    return "Password must be 8+ chars, include uppercase, number & special char.";
  }

  if (name === "username" && !regex.username.test(value)) {
    return "Username must be 3-16 characters (letters, numbers, underscores)";
  }

  if (name === "confirmPassword") {
    // Ensure formData.password exists before comparing
    if (!formData.password) {
      return "Password field is missing";
    }
    if (value !== formData.password) {
      return "Passwords do not match";
    }
  }
  
 

  return ""; // No errors
};
