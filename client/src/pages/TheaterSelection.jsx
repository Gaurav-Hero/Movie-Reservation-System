import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TheaterSelection = () => {
  const navigate = useNavigate();
  const [theaters, setTheaters] = useState([]);

  // Fetch theaters from backend
  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/admin/gettheater", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setTheaters(response.data);
        console.log(theaters)
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    };

    fetchTheaters();
  }, []);

  const handleSelect = (theater) => {
    navigate("/dashboard", { state: { theater: theater.name } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Select Your Theater</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theaters.map((theater) => (
          <div
            key={theater._id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-700 transition"
            onClick={() => handleSelect(theater)}
          >
            <img src={theater.logo} alt={theater.name} className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-xl font-semibold">{theater.name}</h3>
          </div>
        ))}
        {/* Create New Theater Button */}
        <div
          className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-600 transition"
          onClick={() => navigate("/create-theater")}
        >
          <div className="w-20 h-20 bg-gray-500 rounded-full mb-4 flex items-center justify-center">
            <span className="text-3xl">+</span>
          </div>
          <h3 className="text-lg font-semibold">Create New Theater</h3>
        </div>
      </div>
    </div>
  );
};

export default TheaterSelection;
