import { Router } from 'express';

import {
    showShelf
} from '../controllers/theshelf.controller.js';

import {
    showAddTransferPage,
    handleCreateTransfer
} from '../controllers/transfer.controller.js';

const router = Router();

router.get('/', showShelf);

router.get('/add-transfer', showAddTransferPage);

router.post('/add-transfer', handleCreateTransfer);

export default router;