import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserBookings
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.get("/bookings", verifyToken, getUserBookings);

export default router;
