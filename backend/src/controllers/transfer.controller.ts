import type { Request, Response } from 'express';
import {
    TransferRequest,
    getAllTransferRequests,
    addTransferRequest,
    getTransferRequestById
} from "../models/TransferRequest.js";
import { getAllCoffeeBags } from "../models/CoffeeBag.js";
import { getUserById } from "../models/User.js";

function showTransfers(req: Request, res: Response) {
    res.json(getAllTransferRequests());
}

function handleCreateTransfer(req: Request, res: Response) {
    const data = req.body;
    const bagId = Number(data.bagId);
    const senderId = Number(data.senderId);
    const recipientId = Number(data.recipientId);
    const bag = getAllCoffeeBags().find(item => item.id === bagId);

    if (!bag || bag.owner.id !== senderId) {
        return res.status(400).json({ message: "Sender must own the selected coffee bag" });
    }

    if (!getUserById(senderId) || !getUserById(recipientId) || senderId === recipientId) {
        return res.status(400).json({ message: "Valid, different sender and recipient are required" });
    }

    const transfer = new TransferRequest(
        Date.now(),
        bagId,
        senderId,
        recipientId
    );

    addTransferRequest(transfer);

    res.redirect(303, `/shelf?userId=${senderId}`);
}

function handleAcceptTransfer(req: Request, res: Response) {
    const id = Number(req.params.id);
    const transfer = getTransferRequestById(id);

    if (!transfer) {
        return res.status(404).json({ message: "Transfer request not found" });
    }

    if (transfer.status !== 'pending') {
        return res.status(400).json({ message: "Transfer request is no longer pending" });
    }

    if (Number(req.body.userId) !== transfer.recipientId) {
        return res.status(403).json({ message: "Only the recipient can accept this request" });
    }

    const bag = getAllCoffeeBags().find(item => item.id === transfer.bagId);
    const recipient = getUserById(transfer.recipientId);

    if (!bag || bag.owner.id !== transfer.senderId || !recipient) {
        return res.status(409).json({ message: "Bag ownership or recipient is no longer valid" });
    }

    bag.owner = recipient;
    transfer.status = 'accepted';

    res.json(transfer);
}

function handleDeclineTransfer(req: Request, res: Response) {
    const id = Number(req.params.id);
    const transfer = getTransferRequestById(id);

    if (!transfer) {
        return res.status(404).json({ message: "Transfer request not found" });
    }

    if (transfer.status !== 'pending') {
        return res.status(400).json({ message: "Transfer request is no longer pending" });
    }

    if (Number(req.body.userId) !== transfer.recipientId) {
        return res.status(403).json({ message: "Only the recipient can decline this request" });
    }

    transfer.status = 'declined';

    res.json(transfer);
}

export {
    showTransfers,
    handleCreateTransfer,
    handleAcceptTransfer,
    handleDeclineTransfer
};