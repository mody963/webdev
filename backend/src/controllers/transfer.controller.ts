import type { Request, Response } from "express";

import { AppDataSource } from "../data-source.js";
import { TransferRequest } from "../models/TransferRequest.js";
import { CoffeeBag } from "../models/CoffeeBag.js";
import { User } from "../models/User.js";

const transferRepository =
    AppDataSource.getRepository(TransferRequest);

const coffeeBagRepository =
    AppDataSource.getRepository(CoffeeBag);

const userRepository =
    AppDataSource.getRepository(User);


function showAddTransferPage(req: Request, res: Response) {

    res.render("add-transfer", {
        message: null
    });
}


async function handleCreateTransfer(req: Request, res: Response) {

    const bagId = Number(req.body.bagId);
    const senderId = Number(req.body.senderId);
    const recipientId = Number(req.body.recipientId);

    // Validate the IDs
    if (
        !Number.isInteger(bagId) || bagId <= 0 ||
        !Number.isInteger(senderId) || senderId <= 0 ||
        !Number.isInteger(recipientId) || recipientId <= 0
    ) {
        res.status(400).send("All IDs must be valid numbers");
        return;
    }

    // Prevent transferring to yourself
    if (senderId === recipientId) {
        res.status(400).send("Cannot transfer to yourself");
        return;
    }

    // Find the coffee bag
    const coffeeBag = await coffeeBagRepository.findOneBy({
        id: bagId
    });

    if (!coffeeBag) {
        res.status(404).send("Coffee bag not found");
        return;
    }

    // Check ownership
    if (coffeeBag.ownerId !== senderId) {
        res.status(400).send("Sender does not own this coffee bag");
        return;
    }

    // Find the recipient
    const recipient = await userRepository.findOneBy({
        id: recipientId
    });

    if (!recipient) {
        res.status(404).send("Recipient not found");
        return;
    }

    // Create and save the transfer
    const transfer = transferRepository.create({
        bagId,
        senderId,
        recipientId
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