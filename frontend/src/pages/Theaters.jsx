import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';

export default function Theaters() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axiosInstance.get('/theaters');
        setTheaters(response.data);
      } catch (error) {
        console.error('Error fetching theaters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">Our Theaters</h1>
      <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
        {theaters.map((theater) => (
          <div
            key={theater._id}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={theater.imageUrl || 'https://via.placeholder.com/400x225'}
                alt={theater.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                <Link to={`/theaters/${theater._id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {theater.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{theater.address}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {theater.totalSeats} seats • {theater.screens} screens
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 