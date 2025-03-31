import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTheater = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    seatingCapacity: "",
    logo: "", // Storing image URL as a string
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/admin/create-theater",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Theater created successfully!");
      console.log("Theater created:", response.data);
      navigate("/select-theater")
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating theater");
      console.error("Error creating theater:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Create a New Theater</h2>
        {message && <p className="text-center text-red-400">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Theater Name"
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-700"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Theater Address"
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-700"
            required
          />
          <input
            type="number"
            name="seatingCapacity"
            placeholder="Seating Capacity"
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-700"
            required
          />
          <input
            type="text"
            name="logo"
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-700"
            required
          />
          <button type="submit" className="w-full bg-green-600 p-2 rounded">
            Create Theater
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTheater;
