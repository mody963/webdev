import type { Request, Response } from 'express';

import { getAllCoffeeBags } from '../models/CoffeeBag.js';
import { getAllTransferRequests } from '../models/TransferRequest.js';
import { getAllUsers, getUserById } from '../models/User.js';

function showShelf(req: Request, res: Response) {
    const coffeeBags = getAllCoffeeBags();
    const currentUser = getUserById(Number(req.query.userId)) ?? getUserById(1);

    if (!currentUser) {
        return res.status(500).send('No demo users are configured.');
    }

    const incomingRequests = getAllTransferRequests()
        .filter(transfer =>
            transfer.status === 'pending' && transfer.recipientId === currentUser.id
        )
        .flatMap(transfer => {
            const bag = coffeeBags.find(item => item.id === transfer.bagId);
            const sender = getUserById(transfer.senderId);

            return bag && sender ? [{ ...transfer, bag, sender }] : [];
        });

    res.render('theshelf', {
        coffeeBags,
        users: getAllUsers(),
        currentUser,
        pendingTransferCount: incomingRequests.length,
        incomingRequests
    });
}

export { showShelf };