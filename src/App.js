import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginSignup from './components/auth/LoginSignup';
import Home from './pages/Home';
import About from './pages/About';
import ForgotPassword from './components/auth/ForgotPassword';

function App() {
  return (
    <Router>  
    <div className="app-container">
       

      <Routes>
        <Route path="/" element={<LoginSignup/>} /> 
        <Route path="Home" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="ForgotPassword" element={<ForgotPassword/>} />
 
      </Routes>
    </div>
  </Router>
  );
}

export default App;
