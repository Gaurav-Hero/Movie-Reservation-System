import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookSeatsPage = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [pricePerSeat, setPricePerSeat] = useState(200); // or fetch dynamically

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const res = await axios.get(`/api/bookings/showtime/${showtimeId}`);
      const booked = res.data.flatMap(b => b.seats.map(s => s.seatNumber));
      setBookedSeats(booked);
    };

    // Dummy seat map (can be improved later)
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
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const confirmBooking = async () => {
    try {
      await axios.post('/api/bookings', {
        showtimeId,
        seats: selectedSeats.map(seat => ({
          seatNumber: seat,
          price: pricePerSeat
        }))
      });

      alert('Booking Confirmed!');
      navigate('/bookings'); // or redirect to summary
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book seats.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
      <div className="grid grid-cols-6 gap-2 mb-6">
        {seats.map(seat => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            disabled={bookedSeats.includes(seat)}
            className={`
              px-2 py-1 rounded border
              ${bookedSeats.includes(seat) ? 'bg-red-400 cursor-not-allowed' : ''}
              ${selectedSeats.includes(seat) ? 'bg-green-500 text-white' : 'bg-gray-200'}
            `}
          >
            {seat}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total Price: ₹{selectedSeats.length * pricePerSeat}</p>
      </div>

      <button
        onClick={confirmBooking}
        disabled={selectedSeats.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookSeatsPage;
