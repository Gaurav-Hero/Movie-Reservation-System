import express from "express";
import {
  createTicket,
  getTicket,
  getUserTickets,
  cancelTicket,
  validateTicket,
  updatePaymentStatus,
  getShowTickets
} from "../services/ticketService/ticket.controller.js";

const router = express.Router();

// Ticket management routes
router.post("/", createTicket);
router.get("/user/:userId", getUserTickets);
router.get("/show", getShowTickets);
router.get("/:identifier", getTicket);

// Ticket operations
router.put("/:ticketId/cancel", cancelTicket);
router.post("/validate", validateTicket);
router.put("/:ticketId/payment", updatePaymentStatus);

export default router; 