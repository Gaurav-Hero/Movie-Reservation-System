import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../../services/movieService";
import { getShowtimesByMovie } from "../../services/showtimeService";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    getMovieById(id).then(setMovie).catch(console.error);
    getShowtimesByMovie(id).then(setShowtimes).catch(console.error);
  }, [id]);

  if (!movie) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-700 mb-6">{movie.description}</p>

      <h2 className="text-xl font-semibold mb-2">Showtimes</h2>
      {showtimes.length === 0 ? (
        <p>No showtimes available.</p>
      ) : (
        <ul className="space-y-3">
          {showtimes.map((show) => (
            <li
              key={show._id}
              className="border p-3 rounded shadow-sm flex justify-between"
            >
              <div>
                <p><strong>Language:</strong> {show.language}</p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(show.startTime).toLocaleTimeString()} -{" "}
                  {new Date(show.endTime).toLocaleTimeString()}
                </p>
                <p><strong>Price:</strong> ₹{show.price}</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded">
                Book Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
