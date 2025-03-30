import Movie from "../models/Movie.js";

// Add a new movie
export const addMovie = async (req, res) => {
  try {
    const { title, genre, duration, releaseDate, language } = req.body;
    const movie = new Movie({ title, genre, duration, releaseDate, language });
    await movie.save();
    res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update movie details
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    
    movie.title = req.body.title || movie.title;
    movie.genre = req.body.genre || movie.genre;
    movie.duration = req.body.duration || movie.duration;
    movie.releaseDate = req.body.releaseDate || movie.releaseDate;
    movie.language = req.body.language || movie.language;
    
    await movie.save();
    res.json({ message: "Movie updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    await movie.deleteOne();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
