import express from "express";
import { showReservations, showAddReservation, handleAddReservation } from "../controllers/grinderScale.controller.js";

const router = express.Router();

// Route to appropriate controller functions
router.get("/reservations", showReservations);
router.get("/add-reservation", showAddReservation);
router.post("/add-reservation", handleAddReservation);

export default router;


