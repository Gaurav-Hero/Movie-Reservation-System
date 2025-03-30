import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  screenName: {
    type: String,
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
  ticketNumber: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'used', 'cancelled', 'expired'],
    default: 'active'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending'
  },
  qrCode: {
    type: String  // URL or base64 string of QR code
  },
  additionalServices: [{
    type: String,
    enum: ['parking', 'food_combo', 'vip_lounge']
  }],
  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Create a compound index for unique seat allocation
ticketSchema.index(
  { theaterId: 1, screenName: 1, seatNumber: 1, showTime: 1 },
  { unique: true }
);

// Generate ticket number before saving
ticketSchema.pre('save', async function(next) {
  if (!this.ticketNumber) {
    // Generate a unique ticket number: TKT-YYYYMMDD-RANDOM
    const date = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.ticketNumber = `TKT-${date}-${random}`;
  }
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket; 
