import type { Request, Response } from 'express';

import {
    TransferRequest,
    addTransferRequest
} from '../models/TransferRequest.js';

function showAddTransferPage(req: Request, res: Response) {
    res.render("add-transfer", { message: null });
}

function handleCreateTransfer(req: Request, res: Response) {
    const data = req.body;

    addTransferRequest(new TransferRequest(
        Number(data.bagId),
        Number(data.senderId),
        Number(data.recipientId)
    ));

    res.render("add-transfer", {
        message: "Transfer request successfully created!"
    });
}

export {
    showAddTransferPage,
    handleCreateTransfer
};