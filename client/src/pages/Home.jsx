import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mt-10 mb-6 text-center">
        Welcome to Movie Reservation System
      </h1>
      
      <p className="text-lg mb-6 text-center max-w-2xl">
        Book your favorite movies in advance, choose the best seats, and enjoy a seamless reservation experience.
      </p>
      
      <div className="flex gap-4">
        <button className="bg-blue-600 px-6 py-2 rounded-lg shadow-lg">Book Tickets</button>
        <button className="bg-gray-700 px-6 py-2 rounded-lg shadow-lg">View Movies</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {[1, 2, 3].map((movie) => (
          <div key={movie} className="bg-gray-800 shadow-lg rounded-2xl p-4 flex flex-col items-center">
            <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
            <h3 className="text-xl font-semibold">Movie Title {movie}</h3>
            <p className="text-sm text-gray-400">Exciting movie description goes here.</p>
            <button className="mt-4 bg-blue-500 px-4 py-2 rounded-lg">Reserve Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
