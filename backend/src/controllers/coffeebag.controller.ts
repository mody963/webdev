import type { Request, Response } from 'express';
import {
    CoffeeBag,
    getAllCoffeeBags,
    addCoffeeBag
} from '../models/CoffeeBag.js';

function showCoffeeBags(req: Request, res: Response) {
    res.json(getAllCoffeeBags());
}

function showCoffeeBag(req: Request, res: Response) {
    const id = Number(req.params.id);

    const bag = getAllCoffeeBags().find(b => b.id === id);

    if (!bag) {
        return res.status(404).json({ message: "Coffee bag not found" });
    }

    res.json(bag);
}

function handleAddCoffeeBag(req: Request, res: Response) {
    const data = req.body;
    
    const bag = new CoffeeBag(
        data.owner,
        data.bean,
        data.roaster,
        Number(data.grams),
        data.dayOfArival,
        data.bagFreshness,
        data.finished
    );

    addCoffeeBag(bag);

    res.status(201).json(bag);
}

function handleUpdateCoffeeBag(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;

    const bag = getAllCoffeeBags().find(b => b.id === id);

    if (!bag) {
        return res.status(404).json({ message: "Coffee bag not found" });
    }

    bag.owner = data.owner;
    bag.bean = data.bean;
    bag.roaster = data.roaster;
    bag.grams = Number(data.grams);
    bag.dayOfArival = data.dayOfArival;
    bag.bagFreshness = data.bagFreshness;
    bag.finished = data.finished;

    res.json(bag);
}

function handleDeleteCoffeeBag(req: Request, res: Response) {
    const id = Number(req.params.id);

    const bags = getAllCoffeeBags();
    const index = bags.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Coffee bag not found" });
    }

    bags.splice(index, 1);

    res.status(200).json({ message: "Coffee bag successfully deleted" });
}

export {
    showCoffeeBags,
    showCoffeeBag,
    handleAddCoffeeBag,
    handleUpdateCoffeeBag,
    handleDeleteCoffeeBag
};