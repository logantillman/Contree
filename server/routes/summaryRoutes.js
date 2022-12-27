import express from 'express';
import { getSummary, getSummaryById } from '../controllers/summary.js';

const router = express.Router();

router.get('/', getSummary);
router.get('/:id', getSummaryById);

export default router;