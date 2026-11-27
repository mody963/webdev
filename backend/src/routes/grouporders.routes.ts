import express from "express";
import { showGroupOrders, showAddGroupOrderPage, handleAddGroupOrder, showSinglleGroupOrder, handleAddShare } from "../controllers/groupOrder.controller.js";

const router = express.Router();

// Route to appropriate controller functions
router.get("/grouporder", showGroupOrders);
router.get("/add-grouporder", showAddGroupOrderPage);
router.get("/grouporder/:id", showSinglleGroupOrder);
router.post("/add-grouporder", handleAddGroupOrder);
router.post("/grouporder/:id/shares", handleAddShare);

export default router;
