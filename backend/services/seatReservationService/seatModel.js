import mongoose from "mongoose";

const seatReservationSchema = new mongoose.Schema({
  movieId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  seatNumber: { 
    type: String, 
    required: true 
  },
  showTime: { 
    type: Date, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['reserved', 'cancelled', 'completed'],
    default: 'reserved'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending'
  }
}, { timestamps: true });

// Compound index to prevent double booking
seatReservationSchema.index(
  { theaterId: 1, seatNumber: 1, showTime: 1 },
  { unique: true }
);

const SeatReservation = mongoose.model("SeatReservation", seatReservationSchema);

export default SeatReservation; 
