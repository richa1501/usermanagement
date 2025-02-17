import React from 'react';
import Inputfield from '../commoncontrols/inputfield';
import { useNavigate, Link } from "react-router-dom";

 
function forgotpassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  return (
    <div>
        <Inputfield/>
    </div>
  )
}
export default forgotpassword;
