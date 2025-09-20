import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(30, 41, 59, 0.96)', // dark semi-transparent
        color: '#fff',
        fontWeight: 700,
        fontSize: 16,
        borderRadius: 8,
        padding: '12px 18px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        border: '1.5px solid #6366f1',
        minWidth: 120,
        zIndex: 1000
      }}>
        <div style={{ marginBottom: 4 }}>{label}</div>
        <div>Amount: <span style={{ color: '#a5b4fc', fontWeight: 800 }}>{payload[0].value >= 1e6 ? `$${(payload[0].value/1e6).toFixed(2)}M` : payload[0].value >= 1e3 ? `$${(payload[0].value/1e3).toFixed(2)}K` : `$${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}</span></div>
      </div>
    );
  }
  return null;
};

const ExpenseBarChart = ({ data }) => (
  <div className="bg-white rounded-xl shadow p-4 mb-10"> {/* Increased mb-10 for more space below */}
    <h2 className="text-lg font-bold mb-4 text-gray-700">Monthly Expense Trends</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barSize={32} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="period" tick={{ fontSize: 13, fill: '#6b7280' }} />
        <YAxis tick={{ fontSize: 13, fill: '#6b7280' }} tickFormatter={v => v >= 1e6 ? `$${(v/1e6).toFixed(2)}M` : v >= 1e3 ? `$${(v/1e3).toFixed(2)}K` : `$${v.toFixed(2)}`}/>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
        <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ExpenseBarChart;
