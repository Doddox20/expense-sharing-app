import express from 'express';
import groupController from '../controllers/group.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, (req, res) => groupController.create(req, res));
router.get('/', authMiddleware, (req, res) => groupController.getUserGroups(req, res));
router.post('/:id/join', authMiddleware, (req, res) => groupController.join(req, res));

export default router;