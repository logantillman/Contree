import express from 'express';
import { getSummary, getSummaryById, createSummary } from '../controllers/summary.js';

const router = express.Router();

router.get('/', getSummary);
router.post('/', createSummary);
router.get('/:id', getSummaryById);

export default router;