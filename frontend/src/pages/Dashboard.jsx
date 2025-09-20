import React from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseFilters from '../components/expenses/ExpenseFilters';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import { useExpenses } from '../hooks/useExpenses';
import { CATEGORIES } from '../utils/constants';

const Dashboard = () => {
  const {
    expenses,
    loading,
    addExpense,
    editExpense,
    removeExpense,
    bulkRemoveExpenses,
    duplicateExpense,
    chartData,
    pieData,
    setEditExpense,
    editExpenseData,
    clearEditExpense,
    fetchExpenses // <-- add fetchExpenses from context
  } = useExpenses();

  const [period, setPeriod] = React.useState('month');
  const [category, setCategory] = React.useState('all');

  return (
    <div>
      <div className="max-w-6xl mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Expense Tracker Dashboard</h1>
        <button
          className="btn btn-outline btn-info mb-4"
          onClick={() => fetchExpenses({})}
        >
          Fetch All Expenses
        </button>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <BarChart data={chartData} />
            <PieChart data={pieData} />
          </div>
          <div>
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">{editExpenseData ? 'Edit Expense' : 'Add Expense'}</h2>
              <ExpenseForm
                onSubmit={editExpenseData
                  ? (data) => editExpense(editExpenseData._id, data)
                  : addExpense}
                loading={loading}
                initialData={editExpenseData}
                onCancel={clearEditExpense}
              />
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <ExpenseFilters
                  period={period}
                  setPeriod={setPeriod}
                  category={category}
                  setCategory={setCategory}
                  categories={CATEGORIES}
                  onFilter={() => {
                    const params = {};
                    if (period && period !== 'all') params.period = period;
                    if (category && category !== 'all') params.category = category;
                    fetchExpenses(params);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Expenses</h2>
          <ExpenseList
            expenses={expenses}
            loading={loading}
            onEdit={setEditExpense}
            onDelete={expense => removeExpense(expense._id)}
            onDuplicate={expense => duplicateExpense(expense._id)}
            onBulkDelete={bulkRemoveExpenses}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
