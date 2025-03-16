import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { fetchIncomes, fetchExpenses, fetchIncomeCategories, fetchExpenseCategories } from '../services/firebase';
import { Income, Expense, Category } from '../types';

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
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Статистика
            </Typography>
            <Typography>Общий доход: {totalIncome} сом</Typography>
            {incomeByCategory.map((cat) => (
                <Typography key={cat.name}>
                    {cat.name}: {cat.amount} сом
                </Typography>
            ))}
            <Typography>Общие расходы: {totalExpense} сом</Typography>
            {expenseByCategory.map((cat) => (
                <Typography key={cat.name}>
                    {cat.name}: {cat.amount} сом
                </Typography>
            ))}
            <Typography>
                Баланс: {balance} сом {balance >= 0 ? '(в плюсе)' : '(в минусе)'}
            </Typography>
        </Box>
    );
};

export default Stats;