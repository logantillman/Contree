import express from 'express';
import { createLinkToken, exchangePublicToken, getTransactions } from '../controllers/plaid.js';

const router = express.Router();

router.post('/create-link-token', createLinkToken);
router.post('/exchange-public-token', exchangePublicToken);
router.get('/transactions', getTransactions);

export default router;