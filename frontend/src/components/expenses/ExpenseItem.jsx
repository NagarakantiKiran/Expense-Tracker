import React, { useState } from 'react';
import { format } from 'date-fns';
import { CATEGORY_COLORS } from '../../utils/constants';
import { FaEdit, FaTrash, FaCopy, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ExpenseItem({ expense, onEdit, onDelete, onDuplicate, selected, onSelect, className }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <>
      <tr className={`hover:bg-[#23232a] transition rounded-2xl ${className}`}>
        <td>
          <input type="checkbox" checked={selected} onChange={onSelect} className="form-checkbox h-5 w-5 text-indigo-500 rounded-lg border-2 border-[#31313a] focus:ring-indigo-500 transition-all duration-200" />
        </td>
        <td className="font-semibold text-gray-100">{expense.title}</td>
        <td>
          <span className="font-bold text-indigo-400">${expense.amount.toFixed(2)}</span>
        </td>
        <td>
          <span className="px-3 py-1 rounded-2xl text-white text-xs font-semibold shadow" style={{ background: CATEGORY_COLORS[expense.category] || '#888' }}>
            {expense.category}
          </span>
        </td>
        <td className="text-gray-400 font-mono">{format(new Date(expense.date), 'yyyy-MM-dd')}</td>
        <td>
          {expense.description && (
            <button className="btn btn-xs rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow hover:scale-105 transition-all duration-200 flex items-center gap-1" onClick={() => setShowDesc((v) => !v)}>
              {showDesc ? <FaEyeSlash /> : <FaEye />} {showDesc ? 'Hide' : 'Show'}
            </button>
          )}
        </td>
        <td className="flex gap-2 justify-end">
          <button className="btn btn-xs rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 shadow hover:scale-105 transition-all duration-200 flex items-center gap-1" onClick={onEdit}><FaEdit /> Edit</button>
          <button className="btn btn-xs rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white shadow hover:scale-105 transition-all duration-200 flex items-center gap-1" onClick={onDelete}><FaTrash /> Delete</button>
          <button className="btn btn-xs rounded-2xl bg-gradient-to-r from-green-400 to-green-600 text-white shadow hover:scale-105 transition-all duration-200 flex items-center gap-1" onClick={onDuplicate}><FaCopy /> Duplicate</button>
        </td>
      </tr>
      {showDesc && (
        <tr>
          <td colSpan={7} className="bg-[#23232a] text-sm p-3 rounded-b-2xl text-gray-300 border-t border-[#23232a]">
            {expense.description}
          </td>
        </tr>
      )}
    </>
  );
}
