import express from "express";
import {
  createReservation,
  getUserReservations,
  getShowReservations,
  cancelReservation,
  getReservationById
} from "../services/seatReservationService/seatReservation.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Reservation management routes
router.post("/", auth, createReservation);
router.get("/user/:userId", auth, getUserReservations);
router.get("/show", getShowReservations);
router.get("/:reservationId", auth, getReservationById);
router.put("/:reservationId/cancel", auth, cancelReservation);

export default router; 