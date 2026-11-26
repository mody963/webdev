import type { Request, Response } from 'express';

import { CoffeeBag } from '../models/CoffeeBag.js';
import { AppDataSource } from '../data-source.js';


const coffeeBagRepository = AppDataSource.getRepository(CoffeeBag);

async function showSingleCoffeeBag(req: Request, res: Response) {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).send("Invalid coffee bag ID");
        return;
    }

    const coffeeBag = await coffeeBagRepository.findOne({
        where: {
            id: id
        },
        relations: {
            owner: true
        }
    });

    if (!coffeeBag) {
        res.status(404).send("Coffee bag not found");
        return;
    }

    res.render("coffeebag", {
        coffeeBag,
        owner: coffeeBag.owner
    });
}

export {
    showSingleCoffeeBag
};