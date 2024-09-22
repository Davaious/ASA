// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-futuristic-blue to-black text-white">
      <h1 className="text-5xl text-neon-green font-bold mb-6">Welcome to Future Dapp</h1>
      <p className="text-lg mb-8">Manage your clean energy and NFTs easily and securely.</p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="transition duration-500 ease-in-out bg-neon-green text-black hover:bg-white hover:text-neon-green py-2 px-4 rounded-lg shadow-lg transform hover:scale-105"
        >
          Registro
        </Link>
        <Link
          to="/login"
          className="transition duration-500 ease-in-out bg-neon-green text-black hover:bg-white hover:text-neon-green py-2 px-4 rounded-lg shadow-lg transform hover:scale-105"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
