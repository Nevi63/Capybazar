import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/home';
import About from './pages/About/about';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import { Typography, Container } from "@mui/material";

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Typography variant="h4">Página no encontrada</Typography>} />
      </Routes>
    </>
  )
}

export default App
