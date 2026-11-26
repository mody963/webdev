import type { Request, Response } from 'express';

import { CoffeeBag } from '../models/CoffeeBag.js';
import { User } from '../models/User.js';
import { TransferRequest } from '../models/TransferRequest.js';
import { AppDataSource } from '../data-source.js';

const coffeeBagRepository = AppDataSource.getRepository(CoffeeBag);
const userRepository = AppDataSource.getRepository(User);
const transferRepository = AppDataSource.getRepository(TransferRequest);

async function showShelf(req: Request, res: Response) {

    const bags = await coffeeBagRepository.find();
    const users = await userRepository.find();
    const transferRequests = await transferRepository.find();

    const coffeeBags = bags.map(bag => ({
        ...bag,
        owner: users.find(user => user.id === bag.ownerId)
    }));

    res.render("theshelf", {
        coffeeBags,
        transferRequests
    });
}

export {
    showShelf
};