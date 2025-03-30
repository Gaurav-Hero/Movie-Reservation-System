import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import useAuthStore from '../store/useAuthStore';

export default function Profile() {
  const { user, logout } = useAuthStore();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axiosInstance.get('/reservations/user');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="mt-8 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-32 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* User Profile */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Reservation History */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reservation History</h2>
        {reservations.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No reservations yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Start booking movies to see your reservation history here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <div
                key={reservation._id}
                className="bg-white shadow rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {reservation.showtime.movie.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(reservation.showtime.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(reservation.showtime.startTime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {reservation.showtime.theater.name}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:text-right">
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="text-lg font-medium text-gray-900">
                      {reservation.seats.join(', ')}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Total Price</p>
                    <p className="text-lg font-medium text-gray-900">
                      ${(reservation.seats.length * reservation.showtime.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 