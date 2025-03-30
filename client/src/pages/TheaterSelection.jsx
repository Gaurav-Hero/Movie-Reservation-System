import React from "react";
import { useNavigate } from "react-router-dom";

const TheaterSelection = () => {
  const navigate = useNavigate();

  const theaters = [
    { id: 1, name: "Galaxy Cinema" },
    { id: 2, name: "Star Theater" },
    { id: 3, name: "Sunshine Multiplex" },
  ];

  const handleSelect = (theater) => {
    navigate("/dashboard", { state: { theater: theater.name } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Select Your Theater</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theaters.map((theater) => (
          <div
            key={theater.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-700 transition"
            onClick={() => handleSelect(theater)}
          >
            <div className="w-20 h-20 bg-gray-600 rounded-full mb-4"></div>
            <h3 className="text-xl font-semibold">{theater.name}</h3>
          </div>
        ))}
        <div
          className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-600 transition"
          onClick={() => alert("Create new theater")}
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
