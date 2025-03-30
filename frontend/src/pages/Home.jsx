import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';

export default function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await axiosInstance.get('/movies/featured');
        setFeaturedMovies(response.data);
      } catch (error) {
        console.error('Error fetching featured movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1489599929927-ee5135eee186?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Movie theater"
          />
          <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Book Your Movie Experience
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover the latest movies, reserve your seats, and enjoy an unforgettable cinema experience.
          </p>
          <div className="mt-10">
            <Link
              to="/movies"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Movies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900">Featured Movies</h2>
        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg" />
                <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredMovies.map((movie) => (
              <div key={movie._id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/movies/${movie._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {movie.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{movie.genre}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{movie.duration} min</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 