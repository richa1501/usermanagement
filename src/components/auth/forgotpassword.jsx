import React, {useState} from 'react';
import Inputfield from '../commoncontrols/Inputfield';
import Button from '../commoncontrols/Button';
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css';

const Inputfields = [
  { name: "username", placeholder: "Enter your username", type: "text" },
  { name: "password", placeholder: "Enter new password", type: "password" },
  { name: "confirmPassword", placeholder: "Confirm new password", type: "password" }
];
 
function ForgotPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
    //Handle form submission
    const handleSubmit =(e) => {
      e.preventDefault();
      if(formData.newPassword !== formData.confirmNewPassword){
       setMessage("Password and confirmPassword must match ");
       return;
      }
      setMessage("Password reset successfully!");
       // Reset form after successful submission
    setFormData({
      username: "",     
      password: "",
      confirmPassword: "",      
    });
    //navigate("home");
      setTimeout(() => navigate("/"), 2000);
    };


  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
        {Inputfields.map((field) => (
          <Inputfield
            key={field.name}
            name={field.name}
            value={formData[field.name]}
            placeholder={field.placeholder}
            type={field.type || "text"} // Default to "text" if no type is specified
            onChange={handleChange}
            required
          />
        ))}
        </div>
        <Button type="submit" text={"Reset Password"} variant="outline"  />
      </form>
    </div>
  )
}
export default ForgotPassword;
