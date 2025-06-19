import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  cancelBooking
} from "../controllers/Booking.controller.js";

import { verifyToken , verifyAdmin} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/", verifyToken, createBooking); // Book seats
router.get("/", verifyAdmin, getAllBookings); // Admin: all bookings
router.get("/user", verifyToken, getUserBookings); // User: own bookings
router.delete("/:id", verifyToken, cancelBooking); // Cancel by ID

export default router;
