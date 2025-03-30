import React, { useState } from "react";

const ShowManagement = () => {
  const [shows, setShows] = useState([
    { id: 1, movie: "Inception", time: "6:00 PM", screen: 1 },
    { id: 2, movie: "Interstellar", time: "9:00 PM", screen: 2 },
  ]);

  const cancelShow = (id) => {
    setShows(shows.filter((show) => show.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Show Management</h2>
      <div className="grid gap-6">
        {shows.map((show) => (
          <div key={show.id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between">
            <div>
              <h3 className="text-xl font-semibold">{show.movie}</h3>
              <p className="text-gray-400">Time: {show.time} | Screen: {show.screen}</p>
            </div>
            <button 
              className="bg-red-600 px-4 py-2 rounded-lg"
              onClick={() => cancelShow(show.id)}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowManagement;
