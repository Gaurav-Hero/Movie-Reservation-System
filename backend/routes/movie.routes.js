   
import express from "express";
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from "../services/movieService/movie.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
