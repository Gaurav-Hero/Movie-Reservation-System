import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTheater = location.state?.theater || "Unknown Theater"; // Get selected theater

  const [stats, setStats] = useState({
    totalBookings: 128,
    revenue: "$25,000",
    occupancyRate: "85%",
    upcomingShows: 5,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard - {selectedTheater}</h1>
        <button 
          onClick={() => navigate("/select-theater")} 
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Change Theater
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Bookings", value: stats.totalBookings },
          { label: "Revenue", value: stats.revenue },
          { label: "Occupancy Rate", value: stats.occupancyRate },
          { label: "Upcoming Shows", value: stats.upcomingShows },
        ].map((item, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">{item.label}</h3>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[
          { title: "Manage Movies", path: "/movies" },
          { title: "Show Management", path: "/shows" },
          { title: "Check Revenue", path: "/revenue" },
          { title: "Track Bookings", path: "/tracking" },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center cursor-pointer hover:bg-gray-700 transition"
            onClick={() => navigate(section.path)}
          >
            <h3 className="text-xl font-semibold">{section.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
