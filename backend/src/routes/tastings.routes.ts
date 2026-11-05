import express from "express";
import { showTastings, showAddTastingPage, handleAddTasting } from "../controllers/tasting.controller.js";

const router = express.Router();

// Route to appropriate controller functions
router.get("/tastings", showTastings);
router.get("/add-tasting", showAddTastingPage);
router.post("/add-tasting", handleAddTasting);

export default router;


