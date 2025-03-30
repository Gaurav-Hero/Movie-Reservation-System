import Movie from "./movieModel.js";

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const newMovie = await Movie.create(movieData);
    res.status(201).json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update movie
const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete movie (soft delete)
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie };  
