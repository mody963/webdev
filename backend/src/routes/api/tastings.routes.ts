// src/routes/api/tastings.routes.ts
import express from "express";
import {
  getAllTastings,
  getSingleTasting,
  createTasting,
  signUpMember,
} from "../../controllers/api/tasting.controller.js";

const router = express.Router();

router.get("/", getAllTastings);
router.get("/:id", getSingleTasting);
router.post("/", createTasting);
router.post("/:id/signups", signUpMember);

export default router;