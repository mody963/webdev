import express from "express";
import { showTastings, showSingleTasting, showAddTastingPage, handleAddTasting } from "../controllers/tasting.controller.js";

const router = express.Router();

// Route to appropriate controller functions
router.get("/tastings", showTastings);
router.get("/add-tasting", showAddTastingPage);
router.get("/tastings/:id", showSingleTasting);
router.post("/add-tasting", handleAddTasting);

export default router;


