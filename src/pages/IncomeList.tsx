import { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { fetchIncomes, deleteItem, fetchIncomeCategories } from '../services/firebase';
import { Income, Category } from '../types';

const IncomeList = () => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [incomesData, catsData] = await Promise.all([fetchIncomes(), fetchIncomeCategories()]);
                setIncomes(incomesData);
                setCategories(catsData);
            } catch (error) {
                console.error('Error loading incomes:', error);
            }
        };
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteItem('incomes', id);
            setIncomes(incomes.filter((income) => income.id !== id));
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Список доходов
            </Typography>
            {incomes.map((income) => (
                <Box key={income.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>
                        {income.amount} сом ({categories.find((cat) => cat.id === income.categoryId)?.name || 'Неизвестно'})
                    </Typography>
                    <Button onClick={() => handleDelete(income.id)} color="error">
                        Удалить
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default IncomeList;