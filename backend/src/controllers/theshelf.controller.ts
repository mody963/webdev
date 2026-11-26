import type { Request, Response } from 'express';

import { CoffeeBag } from '../models/CoffeeBag.js';
import { TransferRequest } from '../models/TransferRequest.js';
import { AppDataSource } from '../data-source.js';

const coffeeBagRepository = AppDataSource.getRepository(CoffeeBag);
const transferRepository = AppDataSource.getRepository(TransferRequest);

async function showShelf(req: Request, res: Response) {

    const coffeeBags = await coffeeBagRepository.find({
        relations: {
            owner: true
        }
    });

    const transferRequests = await transferRepository.find();

    res.render("theshelf", {
        coffeeBags,
        transferRequests
    });
}

export {
    showShelf
};