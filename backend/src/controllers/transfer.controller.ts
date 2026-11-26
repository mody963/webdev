import type { Request, Response } from 'express';

import { TransferRequest } from '../models/TransferRequest.js';
import { AppDataSource } from '../data-source.js';

const transferRepository =
    AppDataSource.getRepository(TransferRequest);

function showAddTransferPage(req: Request, res: Response) {
    res.render("add-transfer", { message: null });
}

async function handleCreateTransfer(req: Request, res: Response) {
    const data = req.body;

    const transfer = transferRepository.create({
        bagId: Number(data.bagId),
        senderId: Number(data.senderId),
        recipientId: Number(data.recipientId)
    });

    await transferRepository.save(transfer);

    res.render("add-transfer", {
        message: "Transfer request successfully created!"
    });
}

export {
    showAddTransferPage,
    handleCreateTransfer
};