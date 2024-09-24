// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import RegisterSuccess from './pages/RegisterSuccess';
import TwoFASetup from './pages/TwoFASetup'; // Asegúrate de importar las nuevas páginas

const App = () => {
  return (
    <Router>
      <div className="bg-futuristic-blue text-white h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/2fa-setup" element={<TwoFASetup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
