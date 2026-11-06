import type { Request, Response } from 'express';

import { getAllCoffeeBags } from '../models/CoffeeBag.js';
import { getAllTransferRequests } from '../models/TransferRequest.js';

function showShelf(req: Request, res: Response) {
    res.render('shelf', {
        coffeeBags: getAllCoffeeBags(),
        transferRequests: getAllTransferRequests()
    });
}

export { showShelf };