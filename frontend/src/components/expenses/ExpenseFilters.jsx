import React from 'react';

const ExpenseFilters = ({ period, setPeriod, category, setCategory, categories, onFilter }) => (
  <div className="flex items-center gap-x-4 w-full">
    <select
      className="w-44 h-11 px-4 py-2 rounded-lg bg-[#23232a] text-gray-100 border border-[#31313a] shadow focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-medium text-[15px] hover:border-indigo-400"
      value={period}
      onChange={e => setPeriod(e.target.value)}
    >
      <option value="week">This Week</option>
      <option value="month">This Month</option>
      <option value="year">This Year</option>
      <option value="all">All Time</option>
    </select>
    <select
      className="w-44 h-11 px-4 py-2 rounded-lg bg-[#23232a] text-gray-100 border border-[#31313a] shadow focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-medium text-[15px] hover:border-indigo-400"
      value={category}
      onChange={e => setCategory(e.target.value)}
    >
      <option value="all">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    <button
      type="button"
      onClick={onFilter}
      className="w-44 h-11 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 border-none text-[15px]"
    >
      Filter
    </button>
  </div>
);

export default ExpenseFilters;
