import express from "express";
import { initiatePayment, getPaymentStatus } from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, initiatePayment);          // User makes a payment
router.get("/:id", verifyToken, getPaymentStatus);       // Get payment status

export default router;
