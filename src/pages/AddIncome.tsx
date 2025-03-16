import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import { addIncome, fetchIncomeCategories } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

const AddIncome = () => {
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const cats = await fetchIncomeCategories();
                setCategories(cats);
                setLoading(false);
            } catch (error) {
                console.error('Error loading income categories:', error);
                setError('Не удалось загрузить категории');
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleSubmit = async () => {
        if (amount && categoryId) {
            try {
                await addIncome({
                    amount: Number(amount),
                    categoryId,
                    date: new Date().toISOString().split('T')[0],
                });
                navigate('/incomes');
            } catch (error) {
                console.error('Error adding income:', error);
                setError('Не удалось добавить доход');
            }
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Добавить доход
            </Typography>
            {loading ? (
                <Typography>Загрузка категорий...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="income-category-label">Категория</InputLabel>
                        <Select
                            labelId="income-category-label"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            label="Категория"
                        >
                            {categories.length === 0 ? (
                                <MenuItem disabled>Нет категорий, добавьте в /categories</MenuItem>
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
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Добавить
                    </Button>
                </>
            )}
        </Box>
    );
};

export default AddIncome;