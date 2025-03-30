import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  genre: { type: [String], required: true },
  language: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  posterUrl: { type: String, required: true },
  rating: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel; 
