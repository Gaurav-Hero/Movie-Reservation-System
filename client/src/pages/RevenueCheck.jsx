import React from "react";

const RevenueCheck = () => {
  const revenueData = {
    totalRevenue: "$50,000",
    screenRevenue: [
      { screen: 1, revenue: "$20,000" },
      { screen: 2, revenue: "$15,000" },
      { screen: 3, revenue: "$15,000" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Revenue Overview</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Total Revenue: {revenueData.totalRevenue}</h3>
        <ul className="mt-4">
          {revenueData.screenRevenue.map((screen, index) => (
            <li key={index} className="text-gray-400">Screen {screen.screen}: {screen.revenue}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RevenueCheck;
