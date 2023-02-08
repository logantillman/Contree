import express from 'express';
import { createLinkToken, exchangePublicToken, createUser, getTransactions } from '../controllers/plaid.js';

const router = express.Router();

router.post('/create-user', createUser);
router.post('/create-link-token/:id', createLinkToken);
router.post('/exchange-public-token/:id', exchangePublicToken);
router.get('/transactions/:id', getTransactions);

export default router;