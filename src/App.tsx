import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AddIncome from './pages/AddIncome';
import AddExpense from './pages/AddExpense';
import IncomeList from './pages/IncomeList';
import ExpenseList from './pages/ExpenseList';
import Stats from './pages/Stats';
import Categories from './pages/Categories';
import './App.css';

const theme = createTheme();

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/incomes" element={<IncomeList />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/" element={<Stats />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
};

export default App;