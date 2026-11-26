import type { Request, Response } from 'express';

import { CoffeeBag } from '../models/CoffeeBag.js';
import { AppDataSource } from '../data-source.js';

const coffeeBagRepository = AppDataSource.getRepository(CoffeeBag);

async function showShelf(req: Request, res: Response) {

    const coffeeBags = await coffeeBagRepository.find();

    res.render("theshelf", {
        coffeeBags
    });
}

export {
    showShelf,
};