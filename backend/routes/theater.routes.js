import express from "express";
import {
  createTheater,
  getAllTheaters,
  getTheaterById,
  updateTheater,
  manageScreen,
  manageSeats,
  getAvailableSeats,
  deactivateTheater
} from "../services/theaterService/theater.controller.js";

const router = express.Router();

// Theater management routes
router.post("/", createTheater);
router.get("/", getAllTheaters);
router.get("/:theaterId", getTheaterById);
router.put("/:theaterId", updateTheater);
router.delete("/:theaterId", deactivateTheater);

// Screen management routes
router.post("/:theaterId/screens", manageScreen);
router.post("/:theaterId/screens/:screenName/seats", manageSeats);
router.get("/seats/available", getAvailableSeats);

export default router; 