import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Grid} from '@mui/material';
import { fetchIncomeCategories, fetchExpenseCategories, updateCategory, addIncomeCategory, addExpenseCategory } from '../services/firebase';
import { Category } from '../types';

const Categories = () => {
    const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
    const [newIncomeCategory, setNewIncomeCategory] = useState('');
    const [newExpenseCategory, setNewExpenseCategory] = useState('');
    const [editingIncomeCat, setEditingIncomeCat] = useState<string | null>(null);
    const [editingExpenseCat, setEditingExpenseCat] = useState<string | null>(null);
    const [editIncomeValue, setEditIncomeValue] = useState('');
    const [editExpenseValue, setEditExpenseValue] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const [incomeCats, expenseCats] = await Promise.all([fetchIncomeCategories(), fetchExpenseCategories()]);
                setIncomeCategories(incomeCats);
                setExpenseCategories(expenseCats);
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };
        loadCategories();
    }, []);

    const handleAddIncomeCategory = async () => {
        if (newIncomeCategory) {
            try {
                const id = await addIncomeCategory({ name: newIncomeCategory });
                setIncomeCategories([...incomeCategories, { id, name: newIncomeCategory }]);
                setNewIncomeCategory('');
            } catch (error) {
                console.error('Error adding income category:', error);
            }
        }
    };

    const handleAddExpenseCategory = async () => {
        if (newExpenseCategory) {
            try {
                const id = await addExpenseCategory({ name: newExpenseCategory });
                setExpenseCategories([...expenseCategories, { id, name: newExpenseCategory }]);
                setNewExpenseCategory('');
            } catch (error) {
                console.error('Error adding expense category:', error);
            }
        }
    };

    const handleEditIncomeCategory = (cat: Category) => {
        setEditingIncomeCat(cat.id);
        setEditIncomeValue(cat.name);
    };

    const handleEditExpenseCategory = (cat: Category) => {
        setEditingExpenseCat(cat.id);
        setEditExpenseValue(cat.name);
    };

    const saveEditIncomeCategory = async (id: string) => {
        if (editIncomeValue) {
            try {
                await updateCategory('incomeCategories', id, editIncomeValue);
                setIncomeCategories(
                    incomeCategories.map((cat) => (cat.id === id ? { ...cat, name: editIncomeValue } : cat))
                );
                setEditingIncomeCat(null);
                setEditIncomeValue('');
            } catch (error) {
                console.error('Error updating income category:', error);
            }
        }
    };

    const saveEditExpenseCategory = async (id: string) => {
        if (editExpenseValue) {
            try {
                await updateCategory('expenseCategories', id, editExpenseValue);
                setExpenseCategories(
                    expenseCategories.map((cat) => (cat.id === id ? { ...cat, name: editExpenseValue } : cat))
                );
                setEditingExpenseCat(null);
                setEditExpenseValue('');
            } catch (error) {
                console.error('Error updating expense category:', error);
            }
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Управление категориями
            </Typography>
            <Grid container spacing={3}>
                {/* Категории доходов */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Категории доходов</Typography>
                    <TextField
                        label="Новая категория доходов"
                        value={newIncomeCategory}
                        onChange={(e) => setNewIncomeCategory(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button onClick={handleAddIncomeCategory} variant="contained" color="primary" sx={{ mb: 2 }}>
                        Добавить
                    </Button>
                    {incomeCategories.map((cat) => (
                        <Box key={cat.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {editingIncomeCat === cat.id ? (
                                <>
                                    <TextField
                                        value={editIncomeValue}
                                        onChange={(e) => setEditIncomeValue(e.target.value)}
                                        fullWidth
                                        sx={{ mr: 1 }}
                                    />
                                    <Button onClick={() => saveEditIncomeCategory(cat.id)} variant="contained">
                                        Сохранить
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Typography sx={{ flexGrow: 1 }}>{cat.name}</Typography>
                                    <Button onClick={() => handleEditIncomeCategory(cat)} color="primary">
                                        Редактировать
                                    </Button>
                                </>
                            )}
                        </Box>
                    ))}
                </Grid>

                {/* Категории расходов */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Категории расходов</Typography>
                    <TextField
                        label="Новая категория расходов"
                        value={newExpenseCategory}
                        onChange={(e) => setNewExpenseCategory(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button onClick={handleAddExpenseCategory} variant="contained" color="secondary" sx={{ mb: 2 }}>
                        Добавить
                    </Button>
                    {expenseCategories.map((cat) => (
                        <Box key={cat.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {editingExpenseCat === cat.id ? (
                                <>
                                    <TextField
                                        value={editExpenseValue}
                                        onChange={(e) => setEditExpenseValue(e.target.value)}
                                        fullWidth
                                        sx={{ mr: 1 }}
                                    />
                                    <Button onClick={() => saveEditExpenseCategory(cat.id)} variant="contained">
                                        Сохранить
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Typography sx={{ flexGrow: 1 }}>{cat.name}</Typography>
                                    <Button onClick={() => handleEditExpenseCategory(cat)} color="primary">
                                        Редактировать
                                    </Button>
                                </>
                            )}
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Categories;