import React from "react";
import "./Button.css"; // Import your button styles

const Button = ({
  value = "Click Me",   // Default text
  onClick = () => {},   // Default function
  type = "button",      // Default type
  className = "",       // Custom class for additional styles
  variant = "primary",  // Default variant (primary if none is passed)
}) => (
  <button
    onClick={(event) => onClick(event)}  // Call the onClick handler
    type={type}                         // Button type
    className={`button ${variant} ${className}`}  // Combine default styles with dynamic classes
  >
    {value}
  </button>
);

export default Button;
