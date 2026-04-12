import express from 'express';
import expenseController from '../controllers/expense.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, (req, res) => expenseController.create(req, res));

export default router;