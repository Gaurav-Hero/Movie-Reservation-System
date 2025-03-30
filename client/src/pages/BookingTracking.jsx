import React, { useState, useEffect } from "react";

const BookingTracking = () => {
  const [bookings, setBookings] = useState([
    { id: 1, user: "John Doe", movie: "Inception", status: "Confirmed" },
    { id: 2, user: "Jane Smith", movie: "Interstellar", status: "Pending" },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBookings((prevBookings) => [
        ...prevBookings,
        { id: prevBookings.length + 1, user: "New User", movie: "New Movie", status: "Pending" },
      ]);
    }, 5000); // Adds a new booking every 5 seconds (dummy effect)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Live Booking Tracking</h2>
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{booking.user}</h3>
            <p className="text-gray-400">Movie: {booking.movie} | Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTracking;
