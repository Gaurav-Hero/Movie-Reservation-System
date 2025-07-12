import { useEffect, useState } from "react";
import { getAllMovies } from "../../services/movieService";
import MovieCard from "../../components/MovieCard";

export default function MovieListPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Movies 🎬</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
