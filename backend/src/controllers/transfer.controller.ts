import type { Request, Response } from 'express';

import { TransferRequest } from '../models/TransferRequest.js';
import { AppDataSource } from '../data-source.js';

const transferRepository =
    AppDataSource.getRepository(TransferRequest);

function showAddTransferPage(req: Request, res: Response) {
    res.render("add-transfer", {
        message: null
    });
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

async function handleDeleteTransfer(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).send("Invalid transfer ID");
        return;
    }

    const result = await transferRepository.delete(id);

    if (result.affected === 0) {
        res.status(404).send("Transfer request not found");
        return;
    }

    res.redirect("/shelf");
}

export {
    showAddTransferPage,
    handleCreateTransfer,
    handleDeleteTransfer
};