import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  showtimeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showtime",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  seats: [
    {
      seatNumber: String,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
  type: String,
  enum: ["pending", "confirmed", "cancelled", "paid"], // ✅ added "paid"
  default: "pending"
}
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
