import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as expenseService from '../services/expenseService';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [editExpenseData, setEditExpenseData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const fetchExpenses = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await expenseService.getExpenses(params);
      setExpenses(res.expenses);
      setPagination({ page: res.page, limit: res.limit, total: res.total });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = async (expense) => {
    setLoading(true);
    setError(null);
    try {
      const newExpense = await expenseService.createExpense(expense);
      setExpenses((prev) => [newExpense, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editExpense = async (id, expense) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await expenseService.updateExpense(id, expense);
      setExpenses((prev) => prev.map((e) => (e._id === id ? updated : e)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update expense');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeExpense = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await expenseService.deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete expense');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bulkRemoveExpenses = async (ids) => {
    setLoading(true);
    setError(null);
    try {
      await expenseService.bulkDeleteExpenses(ids);
      setExpenses((prev) => prev.filter((e) => !ids.includes(e._id)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to bulk delete expenses');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const duplicateExpense = async (id, date) => {
    setLoading(true);
    setError(null);
    try {
      const newExpense = await expenseService.duplicateExpense(id, date);
      setExpenses((prev) => [newExpense, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to duplicate expense');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setEditExpense = (expense) => setEditExpenseData(expense);
  const clearEditExpense = () => setEditExpenseData(null);

  useEffect(() => {
    // Compute monthly totals for BarChart
    const monthly = {};
    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthly[key] = (monthly[key] || 0) + exp.amount;
    });
    setChartData(
      Object.entries(monthly).map(([period, amount]) => ({ period, amount }))
    );

    // Compute category totals for PieChart
    const categories = {};
    expenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });
    setPieData(
      Object.entries(categories).map(([name, value]) => ({ name, value }))
    );
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        pagination,
        fetchExpenses,
        addExpense,
        editExpense,
        removeExpense,
        bulkRemoveExpenses,
        duplicateExpense,
        setEditExpense,
        editExpenseData,
        clearEditExpense,
        chartData,
        pieData,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}

export { ExpenseContext };
