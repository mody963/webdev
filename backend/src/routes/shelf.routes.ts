import { Router } from 'express';

import {
    showShelf,
} from '../controllers/theshelf.controller.js';

import {
    showSingleCoffeeBag,
} from '../controllers/coffeebag.controller.js';

import {
    showAddTransferPage,
    handleCreateTransfer,
    handleDeleteTransfer
} from '../controllers/transfer.controller.js';

const router = Router();

router.get('/', showShelf);

router.get('/add-transfer', showAddTransferPage);

router.post('/add-transfer', handleCreateTransfer);

router.get("/:id", showSingleCoffeeBag);

router.post("/transfer/:id/delete", handleDeleteTransfer);

export default router;