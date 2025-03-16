//import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AddIncome from './pages/AddIncome';
import AddExpense from './pages/AddExpense';
import IncomeList from './pages/IncomeList';
import Stats from './pages/Stats';
import './App.css';

const theme = createTheme();

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/incomes" element={<IncomeList />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/" element={<Stats />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
};

export default App;