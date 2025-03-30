import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  releaseDate: { type: Date, required: true },
  language: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
