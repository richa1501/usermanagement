import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginSignup from './components/auth/loginsignup';
import Home from './pages/home';
import About from './pages/about';

function App() {
  return (
    <Router>  
    <div className="app-container">
       

      <Routes>
        <Route path="/" element={<LoginSignup/>} /> 
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
      
 
      </Routes>
    </div>
  </Router>
  );
}

export default App;
