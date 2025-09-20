import api from './api';

export const getExpenses = async (params) => {
  const { data } = await api.get('/expenses', { params });
  return data;
};

export const createExpense = async (expense) => {
  const { data } = await api.post('/expenses', expense);
  return data;
};

export const updateExpense = async (id, expense) => {
  const { data } = await api.put(`/expenses/${id}`, expense);
  return data;
};

export const deleteExpense = async (id) => {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
};

export const bulkDeleteExpenses = async (ids) => {
  const { data } = await api.delete('/expenses/bulk', { data: { ids } });
  return data;
};

export const duplicateExpense = async (id, date) => {
  const { data } = await api.post(`/expenses/${id}/duplicate`, { date });
  return data;
};
