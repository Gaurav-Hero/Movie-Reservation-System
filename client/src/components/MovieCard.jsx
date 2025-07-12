import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
      <p className="text-sm text-gray-600">{movie.description.slice(0, 100)}...</p>
      <Link
        to={`/movies/${movie._id}`}
        className="inline-block mt-3 text-blue-500 hover:underline text-sm"
      >
        View Details
      </Link>
    </div>
  );
}
