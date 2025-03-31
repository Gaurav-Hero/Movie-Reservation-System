import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  genre: { type: String, required: true },
  language: { type: String, required: true },
  releaseDate: { type: Date, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;

