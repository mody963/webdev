import express from "express";

import { showShelf } from "../controllers/theshelf.controller.js";

import {
    showCoffeeBags,
    handleAddCoffeeBag
} from "../controllers/coffeeBag.controller.js";

import {
    showTransfers,
    handleCreateTransfer,
    handleAcceptTransfer,
    handleDeclineTransfer
} from "../controllers/transfer.controller.js";

const router = express.Router();

// Shelf overview
router.get("/", showShelf);

// Coffee bags
router.get("/bags", showCoffeeBags);
router.post("/bags", handleAddCoffeeBag);

// Transfers
router.get("/transfers", showTransfers);
router.post("/transfers", handleCreateTransfer);
router.put("/transfers/:id/accept", handleAcceptTransfer);
router.put("/transfers/:id/decline", handleDeclineTransfer);

export default router;