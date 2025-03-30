import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, showtimesResponse] = await Promise.all([
          axiosInstance.get(`/movies/${id}`),
          axiosInstance.get(`/movies/${id}/showtimes`),
        ]);
        setMovie(movieResponse.data);
        setShowtimes(showtimesResponse.data);
        if (showtimesResponse.data.length > 0) {
          setSelectedDate(showtimesResponse.data[0].date);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        navigate('/movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, navigate]);

  const filteredShowtimes = showtimes.filter(
    (showtime) => showtime.date === selectedDate
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 bg-gray-200 rounded-lg" />
            <div className="h-64 bg-gray-200 rounded-lg" />
            <div className="h-64 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Movie Poster */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Movie Info */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {movie.title}
          </h1>
          <div className="mt-6">
            <h2 className="sr-only">Movie information</h2>
            <div className="flex items-center">
              <p className="text-lg text-gray-900">{movie.genre}</p>
              <div className="ml-4 pl-4 border-l border-gray-200">
                <p className="text-lg text-gray-900">{movie.duration} min</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              {movie.description}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Cast</h3>
            <div className="mt-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-500">
                {movie.cast.map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Showtimes</h2>
        <div className="mt-4">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {showtimes.map((showtime) => (
              <option key={showtime.date} value={showtime.date}>
                {new Date(showtime.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredShowtimes.map((showtime) => (
            <button
              key={showtime._id}
              onClick={() => navigate(`/booking/${showtime._id}`)}
              className="group relative flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="text-lg font-medium text-gray-900">
                {new Date(showtime.startTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
              <span className="text-sm text-gray-500">
                {showtime.theater.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 