import express from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} from "../services/movieService/movie.controller.js";

const router = express.Router();

// Movie management routes
router.post("/", createMovie);
router.get("/", getAllMovies);
router.get("/:movieId", getMovieById);
router.put("/:movieId", updateMovie);
router.delete("/:movieId", deleteMovie);

export default router;
