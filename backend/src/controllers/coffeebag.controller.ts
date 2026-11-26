import type { Request, Response } from 'express';

import { CoffeeBag } from '../models/CoffeeBag.js';
import { AppDataSource } from '../data-source.js';
import { User } from '../models/User.js';

const userRepository = AppDataSource.getRepository(User);

const coffeeBagRepository = AppDataSource.getRepository(CoffeeBag);


async function showSingleCoffeeBag(req: Request, res: Response) {
    const id = Number(req.params.id);

    const coffeeBag = await coffeeBagRepository.findOneBy({
        id: id
    });

    if (!coffeeBag) {
        res.status(404).send("Coffee bag not found");
        return;
    }

    const owner = await userRepository.findOneBy({
        id: coffeeBag.ownerId
    });

    res.render("coffeebag", {
        coffeeBag,
        owner
    });
}

export {
    showSingleCoffeeBag
};