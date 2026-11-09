import express from "express";
import { showGroupOrders, showAddGroupOrderPage, handleAddGroupOrder } from "../controllers/groupOrder.controller.js";

const router = express.Router();

// Route to appropriate controller functions
router.get("/grouporder", showGroupOrders);
router.get("/add-grouporder", showAddGroupOrderPage);
router.post("/add-grouporder", handleAddGroupOrder);

export default router;
