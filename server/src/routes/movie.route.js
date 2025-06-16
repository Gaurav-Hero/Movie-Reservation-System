import express from 'express';
import {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} from '../controllers/movie.controller.js';

import { verifyToken , verifyAdmin} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, addMovie); // Add movie
router.get('/', getAllMovies); // List all
router.get('/:id', getMovieById); // Single movie
router.put('/:id', verifyToken, verifyAdmin, updateMovie); // Update
router.delete('/:id', verifyToken, verifyAdmin, deleteMovie); // Delete

export default router;
