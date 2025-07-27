import axios from "axios";

const API_URL = "http://localhost:4000/api/bookings"; // adjust if needed

export const createBookingService = async () => {
  const res = await axios.post(`${API_URL}`, {
        showtimeId,
        seats: selectedSeats.map(seat => ({
          seatNumber: seat,
          price: pricePerSeat
        }))
      });
  return res.data;
};
