import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({
  expenses = [],
  loading,
  onEdit,
  onDelete,
  onDuplicate,
  onBulkDelete
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const selectAll = () => {
    if (selectedIds.length === expenses.length) setSelectedIds([]);
    else setSelectedIds(expenses.map((e) => e._id));
  };
  const handleBulkDelete = () => {
    setConfirmDelete(true);
  };
  const confirmBulkDelete = () => {
    onBulkDelete(selectedIds);
    setSelectedIds([]);
    setConfirmDelete(false);
  };

  if (loading) return <div className="text-center py-8 text-lg text-gray-500">Loading expenses...</div>;
  if (!expenses.length) return <div className="text-center py-8 text-lg text-gray-400">No expenses found.</div>;

  return (
    <div className="overflow-x-auto">
      {selectedIds.length > 0 && (
        <div className="mb-2 flex gap-2">
          <button className="btn btn-error btn-sm rounded-2xl shadow bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold hover:scale-105 transition-all duration-200">
            Delete Selected ({selectedIds.length})
          </button>
        </div>
      )}
      <table className="table w-full bg-[#18181b] rounded-2xl shadow-xl overflow-hidden border border-[#23232a]">
        <thead className="bg-[#23232a] text-gray-300">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedIds.length === expenses.length}
                onChange={selectAll}
                className="form-checkbox h-5 w-5 text-indigo-500 rounded-lg border-2 border-[#31313a] focus:ring-indigo-500 transition-all duration-200"
              />
            </th>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#23232a]">
          {expenses.map((expense, idx) => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              selected={selectedIds.includes(expense._id)}
              onSelect={() => toggleSelect(expense._id)}
              onEdit={() => onEdit(expense)}
              onDelete={() => onDelete(expense)}
              onDuplicate={() => onDuplicate(expense)}
              className={idx % 2 === 0 ? 'bg-[#18181b]' : 'bg-[#23232a]'}
            />
          ))}
        </tbody>
      </table>
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow">
            <p className="mb-4">Are you sure you want to delete {selectedIds.length} expenses?</p>
            <div className="flex gap-2 mt-4 justify-end">
              <button className="btn btn-error" onClick={confirmBulkDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
