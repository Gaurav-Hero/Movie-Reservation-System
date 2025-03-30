import express from "express";
import {
  createReservation,
  getUserReservations,
  getShowReservations,
  cancelReservation,
  getReservationById,
  updateReservation
} from "../services/seatReservationService/seatReservation.controller.js";

const router = express.Router();

// Reservation management routes
router.post("/", createReservation);
router.get("/user/:userId", getUserReservations);
router.get("/show", getShowReservations);
router.get("/:reservationId", getReservationById);
router.put("/:reservationId", updateReservation);
router.put("/:reservationId/cancel", cancelReservation);

export default router; 