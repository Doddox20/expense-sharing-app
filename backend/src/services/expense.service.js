import expenseRepository from '../repositories/expense.repository.js';

class ExpenseService {

    async createExpense(data, userId) {
        if (data.paidBy !== userId) {
            throw new Error('Unauthorized: payer must be the logged user');
        }

        const totalSplit = data.participants.reduce(
            (sum, p) => sum + p.amount,
            0
        );

        if (totalSplit !== data.amount) {
            throw new Error('Split amounts do not match total expense');
        }

        return await expenseRepository.createExpenseWithSplits(data);
    }
}

export default new ExpenseService();