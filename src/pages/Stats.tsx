import { useEffect, useState } from 'react';
import { Income, Expense, Category } from '../types';
import { fetchIncomes, fetchExpenses, fetchIncomeCategories, fetchExpenseCategories } from '../services/firebase';

const Stats = () => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [incomesData, expensesData, incomeCatsData, expenseCatsData] = await Promise.all([
                    fetchIncomes(),
                    fetchExpenses(),
                    fetchIncomeCategories(),
                    fetchExpenseCategories(),
                ]);
                setIncomes(incomesData);
                setExpenses(expensesData);
                setIncomeCategories(incomeCatsData);
                setExpenseCategories(expenseCatsData);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, []);

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const balance = totalIncome - totalExpense;

    const incomeByCategory = incomeCategories.map((cat) => ({
        name: cat.name,
        amount: incomes.filter((inc) => inc.categoryId === cat.id).reduce((sum, inc) => sum + inc.amount, 0),
    }));

    const expenseByCategory = expenseCategories.map((cat) => ({
        name: cat.name,
        amount: expenses.filter((exp) => exp.categoryId === cat.id).reduce((sum, exp) => sum + exp.amount, 0),
    }));

    return (
        <div>
            <h2>Статистика</h2>
            <p>Общий доход: {totalIncome} сом</p>
            {incomeByCategory.map((cat) => (
                <p key={cat.name}>
                    {cat.name}: {cat.amount} сом
                </p>
            ))}
            <p>Общие расходы: {totalExpense} сом</p>
            {expenseByCategory.map((cat) => (
                <p key={cat.name}>
                    {cat.name}: {cat.amount} сом
                </p>
            ))}
            <p>
                Баланс: {balance} сом {balance >= 0 ? '(в плюсе)' : '(в минусе)'}
            </p>
        </div>
    );
};

export default Stats;