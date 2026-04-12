import expenseService from '../services/expense.service.js';

class ExpenseController {

    async create(req, res) {
        try {
            const userId = req.user.userId;

            const expense = await expenseService.createExpense(req.body, userId);

            res.status(201).json(expense);

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default new ExpenseController();