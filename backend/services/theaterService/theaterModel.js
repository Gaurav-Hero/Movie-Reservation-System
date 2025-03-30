import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['standard', 'premium', 'vip'],
    default: 'standard'
  },
  basePrice: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

const screenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  seats: [seatSchema],
  technology: {
    type: String,
    enum: ['2D', '3D', 'IMAX', '4DX'],
    default: '2D'
  }
});

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  screens: [screenSchema],
  facilities: [{
    type: String,
    enum: ['parking', 'food_court', 'wheelchair_accessible', 'dolby_sound']
  }],
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Ensure unique theater name in a location
theaterSchema.index(
  { 'name': 1, 'location.city': 1 },
  { unique: true }
);

// Ensure unique seat numbers within a screen
screenSchema.index(
  { 'seats.seatNumber': 1 },
  { unique: true }
);

const Theater = mongoose.model("Theater", theaterSchema);

export default Theater; 
