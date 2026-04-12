import { pool } from '../db/index.js';

class ExpenseRepository {

    async createExpenseWithSplits(expenseData) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const { groupId, amount, description, paidBy, participants } = expenseData;

            const expenseResult = await client.query(
                `INSERT INTO expenses (group_id, paid_by, amount, description)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
                [groupId, paidBy, amount, description]
            );

            const expense = expenseResult.rows[0];

            for (const participant of participants) {
                await client.query(
                    `INSERT INTO expense_splits (expense_id, user_id, amount)
                     VALUES ($1, $2, $3)`,
                    [expense.id, participant.userId, participant.amount]
                );
            }

            await client.query('COMMIT');

            return expense;

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;

        } finally {
            client.release();
        }
    }
}

export default new ExpenseRepository();