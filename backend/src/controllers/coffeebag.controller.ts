import type { Request, Response } from 'express';

import {
    getAllCoffeeBags,
} from '../models/CoffeeBag.js';

function showShelf(req: Request, res: Response) {
    res.render("theshelf", {
        coffeeBags: getAllCoffeeBags()
    });
}



export {
    showShelf,
};