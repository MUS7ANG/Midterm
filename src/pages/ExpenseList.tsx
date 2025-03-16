import { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { fetchExpenses, deleteItem, fetchExpenseCategories } from '../services/firebase';
import { Expense, Category } from '../types';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [expensesData, catsData] = await Promise.all([fetchExpenses(), fetchExpenseCategories()]);
                setExpenses(expensesData);
                setCategories(catsData);
            } catch (error) {
                console.error('Error loading expenses:', error);
            }
        };
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteItem('expenses', id);
            setExpenses(expenses.filter((expense) => expense.id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Список расходов
            </Typography>
            {expenses.map((expense) => (
                <Box key={expense.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>
                        {expense.amount} сом ({categories.find((cat) => cat.id === expense.categoryId)?.name || 'Неизвестно'})
                    </Typography>
                    <Button onClick={() => handleDelete(expense.id)} color="error">
                        Удалить
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default ExpenseList;