import express from "express";
import {
  getAllBookings,
  getAllUsers,
  deleteUser,
  getAllPayments
} from "../controllers/admin.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/bookings", verifyToken, verifyAdmin, getAllBookings);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/payments", verifyToken, verifyAdmin, getAllPayments);

export default router;
