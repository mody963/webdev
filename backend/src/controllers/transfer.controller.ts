import type { Request, Response } from 'express';
import {
    TransferRequest,
    getAllTransferRequests,
    addTransferRequest,
    getTransferRequestById
} from "../models/TransferRequest.js";

function showTransfers(req: Request, res: Response) {
    res.json(getAllTransferRequests());
}

function handleCreateTransfer(req: Request, res: Response) {
    const data = req.body;

    const transfer = new TransferRequest(
        Date.now(),
        Number(data.bagId),
        Number(data.senderId),
        Number(data.recipientId)
    );

    addTransferRequest(transfer);

    res.status(201).json(transfer);
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

    transfer.status = 'declined';

    res.json(transfer);
}

export {
    showTransfers,
    handleCreateTransfer,
    handleAcceptTransfer,
    handleDeclineTransfer
};