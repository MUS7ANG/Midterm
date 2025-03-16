import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import { addExpense, fetchExpenseCategories } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

const AddExpense = () => {
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await fetchExpenseCategories();
                setCategories(cats);
                console.log('Expense Categories:', cats);
            } catch (error) {
                console.error('Error loading expense categories:', error);
            }
        };
        loadCategories();
    }, []);

    const handleSubmit = async () => {
        if (amount && categoryId) {
            try {
                await addExpense({
                    amount: Number(amount),
                    categoryId,
                    date: new Date().toISOString().split('T')[0],
                });
                navigate('/expenses');
            } catch (error) {
                console.error('Error adding expense:', error);
            }
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Добавить расход
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="expense-category-label">Категория</InputLabel>
                <Select
                    labelId="expense-category-label"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    label="Категория"
                >
                    {categories.length === 0 ? (
                        <MenuItem disabled>Категории не загружены</MenuItem>
                    ) : (
                        categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
            <TextField
                label="Сумма"
                variant="outlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button onClick={handleSubmit} variant="contained" color="secondary">
                Добавить
            </Button>
        </Box>
    );
};

export default AddExpense;