import React from 'react';

function SignupForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6">Register</h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Email</label>
          <input type="email" className="w-full p-2 rounded bg-gray-700 text-white" />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Password</label>
          <input type="password" className="w-full p-2 rounded bg-gray-700 text-white" />
        </div>
        <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
