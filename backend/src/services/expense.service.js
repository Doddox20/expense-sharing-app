import expenseRepository from '../repositories/expense.repository.js';

class ExpenseService {

    async createExpense(data, userId) {

    if (data.paidBy !== userId) {
        throw new Error('Unauthorized: payer must be the logged user');
    }

    data.amount = Number(data.amount.toFixed(2));
    data.participants = data.participants.map(p => ({
        ...p,
        amount: Number(p.amount.toFixed(2))
    }));

    const totalSplit = data.participants.reduce(
        (sum, p) => sum + p.amount,
        0
    );

    if (Math.abs(totalSplit - data.amount) > 0.01) {
        throw new Error('Split amounts do not match total expense');
    }

    const group = await groupRepository.findById(data.groupId);
    if (!group) {
        throw new Error('Group not found');
    }

    for (const participant of data.participants) {
        const isMember = await groupRepository.isMember(
            participant.userId,
            data.groupId
        );

        if (!isMember) {
            throw new Error(`User ${participant.userId} is not in group`);
        }
    }

    return await expenseRepository.createExpenseWithSplits(data);
}
}

export default new ExpenseService();