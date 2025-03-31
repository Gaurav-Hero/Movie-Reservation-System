import express from "express";
import { createTheater, getTheaters } from "../controllers/theater.controller.js";
import protectRoute from '../middleware/protectAdmin.middleware.js'

const router = express.Router();

// Route: Create Theater (Only for Admins)
router.post("/create-theater",protectRoute, createTheater);
router.get("/gettheater",protectRoute, getTheaters);

export default router;
