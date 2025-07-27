import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBookingService } from '../../services/bookingService';
import axios from 'axios'
const BookSeatsPage = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [pricePerSeat, setPricePerSeat] = useState(200); // Static for now

  // Dummy seat map creation
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await axios.get(`/api/bookings/showtime/${showtimeId}`);
        const booked = res.data.flatMap(b => b.seats.map(s => s.seatNumber));
        setBookedSeats(booked);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };

    const allSeats = [];
    for (let row = 1; row <= 5; row++) {
      for (let col = 1; col <= 6; col++) {
        allSeats.push(`R${row}S${col}`);
      }
    }
    setSeats(allSeats);
    fetchBookedSeats();
  }, [showtimeId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(prev => prev.filter(s => s !== seat));
    } else {
      setSelectedSeats(prev => [...prev, seat]);
    }
  };

  const confirmBooking = async () => {
    try {
      let bookingMsg = createBookingService(showtimeId, selectedSeats, pricePerSeat)
      console.log(bookingMsg);
      alert('Booking Confirmed!');
      navigate('/bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book seats.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Select Your Seats</h1>

        <div className="grid grid-cols-6 sm:grid-cols-6 gap-3 mb-6 justify-center">
          {seats.map(seat => (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              disabled={bookedSeats.includes(seat)}
              className={`
                h-10 w-full text-sm rounded font-medium transition duration-200
                ${bookedSeats.includes(seat)
                  ? 'bg-red-400 text-white cursor-not-allowed'
                  : selectedSeats.includes(seat)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-blue-200'}
              `}
            >
              {seat}
            </button>
          ))}
        </div>

        <div className="mb-4 text-center">
          <p className="text-lg font-medium">
            🎟️ Selected Seats: <span className="font-semibold text-green-700">{selectedSeats.join(', ') || 'None'}</span>
          </p>
          <p className="text-lg font-medium">
            💰 Total Price: <span className="font-semibold text-blue-700">₹{selectedSeats.length * pricePerSeat}</span>
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={confirmBooking}
            disabled={selectedSeats.length === 0}
            className={`mt-4 px-6 py-2 rounded-md text-white font-semibold transition ${
              selectedSeats.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSeatsPage;
