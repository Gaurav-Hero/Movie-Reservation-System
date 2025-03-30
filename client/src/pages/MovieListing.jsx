import React, { useState } from "react";

const MovieListing = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", genre: "Sci-Fi", duration: "2h 28m" },
    { id: 2, title: "The Dark Knight", genre: "Action", duration: "2h 32m" },
    { id: 3, title: "Interstellar", genre: "Sci-Fi", duration: "2h 49m" },
  ]);

  const removeMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Movie Listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p className="text-gray-400">{movie.genre} | {movie.duration}</p>
            <button 
              className="mt-4 bg-red-600 px-4 py-2 rounded-lg"
              onClick={() => removeMovie(movie.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListing;
