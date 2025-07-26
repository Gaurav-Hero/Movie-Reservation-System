import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../services/movieService";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    setUser({ name: "Gaurav", role: "user" }); // placeholder

    // Fetch movies from backend
    const fetchMovies = async () => {
      getAllMovies().then(setMovies).catch(console.error);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Movie Booking System 🎬</h1>
      <p className="mt-2">Enjoy browsing movies and book your favorite seats!</p>

      {/* Movies List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Now Showing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie._id} className="bg-white shadow p-4 rounded">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm mt-1 text-gray-600">{movie.description}</p>
              <button
                onClick={() => navigate(`/movies/${movie._id}`)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
