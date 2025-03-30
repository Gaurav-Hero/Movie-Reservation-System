import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';

export default function Booking() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);

  useEffect(() => {
    const fetchShowtimeDetails = async () => {
      try {
        const response = await axiosInstance.get(`/showtimes/${showtimeId}`);
        setShowtime(response.data);
      } catch (error) {
        console.error('Error fetching showtime details:', error);
        toast.error('Failed to load showtime details');
        navigate('/movies');
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimeDetails();
  }, [showtimeId, navigate]);

  const handleSeatClick = (seatNumber) => {
    if (showtime.reservedSeats.includes(seatNumber)) {
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      }
      return [...prev, seatNumber];
    });
  };

  const handleReservation = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    setReserving(true);
    try {
      await axiosInstance.post('/reservations', {
        showtimeId,
        seats: selectedSeats,
      });
      toast.success('Reservation successful!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to make reservation');
    } finally {
      setReserving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="mt-8 h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!showtime) {
    return null;
  }

  const totalPrice = selectedSeats.length * showtime.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Movie Info */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {showtime.movie.title}
          </h1>
          <div className="mt-4">
            <p className="text-lg text-gray-500">
              {new Date(showtime.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-lg text-gray-500">
              {new Date(showtime.startTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
            <p className="text-lg text-gray-500">{showtime.theater.name}</p>
          </div>
        </div>

        {/* Seat Selection */}
        <div className="mt-10 lg:mt-0">
          <h2 className="text-2xl font-bold text-gray-900">Select Seats</h2>
          <div className="mt-4">
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: showtime.theater.totalSeats }, (_, i) => i + 1).map(
                (seatNumber) => (
                  <button
                    key={seatNumber}
                    onClick={() => handleSeatClick(seatNumber)}
                    disabled={showtime.reservedSeats.includes(seatNumber)}
                    className={`
                      aspect-square rounded-md text-sm font-medium
                      ${
                        showtime.reservedSeats.includes(seatNumber)
                          ? 'bg-gray-300 cursor-not-allowed'
                          : selectedSeats.includes(seatNumber)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }
                    `}
                  >
                    {seatNumber}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 rounded-md mr-2" />
              <span className="text-sm text-gray-500">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-indigo-600 rounded-md mr-2" />
              <span className="text-sm text-gray-500">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-300 rounded-md mr-2" />
              <span className="text-sm text-gray-500">Reserved</span>
            </div>
          </div>

          {/* Price and Reserve Button */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Selected Seats</p>
                <p className="text-lg font-medium text-gray-900">
                  {selectedSeats.length} seats
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-lg font-medium text-gray-900">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handleReservation}
              disabled={reserving || selectedSeats.length === 0}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {reserving ? 'Reserving...' : 'Reserve Seats'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 