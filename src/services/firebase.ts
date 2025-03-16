import axiosApi from '../firebaseAPI.ts';
import { Income, Expense, Category } from '../types';

export const addIncome = async (income: Omit<Income, 'id'>) => {
    try {
        const response = await axiosApi.post('/incomes.json', income);
        return response.data.name;
    } catch (error) {
        console.error('Error adding income:', error);
        throw error;
    }
};

export const addExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
        const response = await axiosApi.post('/expenses.json', expense);
        return response.data.name;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};

export const fetchIncomes = async (): Promise<Income[]> => {
    try {
        const response = await axiosApi.get('/incomes.json');
        const data = response.data || {};
        return Object.entries(data).map(([id, income]) => ({
            id,
            ...(income as Omit<Income, 'id'>),
        })) as Income[];
    } catch (error) {
        console.error('Error fetching incomes:', error);
        throw error;
    }
};

export const fetchExpenses = async (): Promise<Expense[]> => {
    try {
        const response = await axiosApi.get('/expenses.json');
        const data = response.data || {};
        return Object.entries(data).map(([id, expense]) => ({
            id,
            ...(expense as Omit<Expense, 'id'>),
        })) as Expense[];
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

export const fetchIncomeCategories = async (): Promise<Category[]> => {
    try {
        const response = await axiosApi.get('/incomeCategories.json');
        const data = response.data || {};
        return Object.entries(data).map(([id, category]) => ({
            id,
            ...(category as Omit<Category, 'id'>),
        })) as Category[];
    } catch (error) {
        console.error('Error fetching income categories:', error);
        throw error;
    }
};

export const fetchExpenseCategories = async (): Promise<Category[]> => {
    try {
        const response = await axiosApi.get('/expenseCategories.json');
        const data = response.data || {};
        return Object.entries(data).map(([id, category]) => ({
            id,
            ...(category as Omit<Category, 'id'>),
        })) as Category[];
    } catch (error) {
        console.error('Error fetching expense categories:', error);
        throw error;
    }
};

export const deleteItem = async (type: 'incomes' | 'expenses', id: string) => {
    try {
        await axiosApi.delete(`/${type}/${id}.json`);
    } catch (error) {
        console.error(`Error deleting ${type}:`, error);
        throw error;
    }
};

// Новые функции для категорий
export const addIncomeCategory = async (category: Omit<Category, 'id'>) => {
    try {
        const response = await axiosApi.post('/incomeCategories.json', category);
        return response.data.name;
    } catch (error) {
        console.error('Error adding income category:', error);
        throw error;
    }
};

export const addExpenseCategory = async (category: Omit<Category, 'id'>) => {
    try {
        const response = await axiosApi.post('/expenseCategories.json', category);
        return response.data.name;
    } catch (error) {
        console.error('Error adding expense category:', error);
        throw error;
    }
};

export const updateCategory = async (type: 'incomeCategories' | 'expenseCategories', id: string, name: string) => {
    try {
        await axiosApi.patch(`/${type}/${id}.json`, { name });
    } catch (error) {
        console.error(`Error updating ${type}:`, error);
        throw error;
    }
};