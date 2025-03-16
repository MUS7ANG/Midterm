import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import { addIncome, fetchIncomeCategories } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

const AddIncome = () => {
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await fetchIncomeCategories();
                setCategories(cats);
                console.log('Income Categories:', cats);
            } catch (error) {
                console.error('Error loading income categories:', error);
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
            }
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Добавить доход
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="income-category-label">Категория</InputLabel>
                <Select
                    labelId="income-category-label"
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
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Добавить
            </Button>
        </Box>
    );
};

export default AddIncome;