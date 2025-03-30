import React, { useState } from "react";

const CreateShow = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const movies = ["Inception", "Interstellar", "The Dark Knight", "Avatar", "Avengers"];
  
  // Define VIP and Regular seats
  const rows = 6;
  const cols = 10;
  const vipSeats = ["1-3", "1-4", "1-5", "1-6", "1-7"]; // Pre-booked VIP seats (disabled)

  // Toggle seat selection
  const toggleSeat = (seatId) => {
    if (!vipSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.includes(seatId)
        ? selectedSeats.filter(seat => seat !== seatId)
        : [...selectedSeats, seatId]
      );
    }
  };

  const handleSubmit = () => {
    const showData = {
      movie: selectedMovie,
      date,
      time,
      ticketPrice,
      seats: selectedSeats,
    };
    console.log("Show Created:", showData);
    alert("Show Created Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Create a Show</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Movie Selection */}
        <label className="block mb-2 text-lg">Select Movie</label>
        <select
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 mb-4"
        >
          <option value="">Choose a movie</option>
          {movies.map((movie, index) => (
            <option key={index} value={movie}>{movie}</option>
          ))}
        </select>

        {/* Date & Time Inputs */}
        <label className="block mb-2 text-lg">Date</label>
        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 mb-4"
        />

        <label className="block mb-2 text-lg">Time</label>
        <input 
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 mb-4"
        />

        {/* Ticket Price */}
        <label className="block mb-2 text-lg">Ticket Price</label>
        <input 
          type="number"
          placeholder="Enter Price"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 mb-4"
        />

        {/* Theater Screen Visualization */}
        <div className="bg-gray-600 w-full h-8 rounded-t-lg mb-4 flex items-center justify-center text-gray-300">
          SCREEN
        </div>

        {/* Seat Selection Grid with Curve */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Select Seats</h3>
        <div className="flex flex-col items-center gap-2">
          {[...Array(rows)].map((_, row) => (
            <div key={row} className={`flex gap-2 justify-center w-full transform ${row === 0 ? "translate-y-3" : row === 1 ? "translate-y-2" : ""}`}>
              {[...Array(cols)].map((_, col) => {
                const seatId = `${row}-${col}`;
                return (
                  <button
                    key={seatId}
                    onClick={() => toggleSeat(seatId)}
                    disabled={vipSeats.includes(seatId)}
                    className={`w-9 h-9 text-xs flex items-center justify-center rounded-full
                      ${selectedSeats.includes(seatId) ? "bg-blue-500" : "bg-gray-500"}
                      ${vipSeats.includes(seatId) ? "bg-red-600 cursor-not-allowed" : "hover:bg-gray-400"}
                    `}
                  >
                    {col + 1}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className="w-full mt-6 bg-green-600 px-4 py-2 rounded-lg font-semibold"
        >
          Create Show
        </button>
      </div>
    </div>
  );
};

export default CreateShow;
