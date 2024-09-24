import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Importa Home correctamente
import Register from './pages/Register'; // Importa Register correctamente
import Login from './pages/Login'; // Importa Login correctamente



const App = () => {
  return (
    <Router>
      <div className="bg-futuristic-blue text-white h-screen">
        <Routes>
          {/* Define las rutas correctamente */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
