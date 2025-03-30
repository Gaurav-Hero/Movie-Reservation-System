import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {message && <p className="text-center text-green-400">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-700" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-700" required />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-700" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-700" required />
          <button type="submit" className="w-full bg-green-600 p-2 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
