import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = response.data;

      // Save token and user data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect only if user is an admin
      if (user.role === "admin") {
        navigate("/select-theater");
      } else {
        setMessage("Access denied! Only admins can log in.");
        localStorage.removeItem("token"); // Remove token if not admin
        localStorage.removeItem("user");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {message && <p className="text-center text-red-400">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            className="w-full p-2 mb-4 rounded bg-gray-700" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            className="w-full p-2 mb-4 rounded bg-gray-700" 
            required 
          />
          <button type="submit" className="w-full bg-blue-600 p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
