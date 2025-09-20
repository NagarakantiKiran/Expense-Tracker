import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CATEGORIES } from '../../utils/constants';
import { format } from 'date-fns';

const defaultValues = {
  title: '',
  amount: '',
  category: CATEGORIES[0],
  date: format(new Date(), 'yyyy-MM-dd'),
  description: ''
};

export default function ExpenseForm({
  onSubmit,
  loading,
  initialData,
  onCancel
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues
  });

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('amount', initialData.amount.toFixed(2));
      setValue('category', initialData.category);
      setValue('date', format(new Date(initialData.date), 'yyyy-MM-dd'));
      setValue('description', initialData.description || '');
    } else {
      reset(defaultValues);
    }
  }, [initialData, setValue, reset]);

  const submitHandler = async (data) => {
    data.amount = parseFloat(data.amount);
    await onSubmit(data);
    if (!initialData) reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 bg-[#18181b] p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-[#23232a]">
      <div>
        <label className="block font-semibold mb-2 text-gray-200 tracking-wide">Title</label>
        <input
          {...register('title', { required: 'Title is required', maxLength: 100 })}
          className="input w-full rounded-2xl px-4 py-3 bg-[#23232a] text-gray-100 border border-[#31313a] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-medium placeholder-gray-500"
          maxLength={100}
          placeholder="Expense title"
        />
        {errors.title && <span className="text-red-400 text-xs mt-1">{errors.title.message}</span>}
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-200 tracking-wide">Amount</label>
        <div className="flex items-center">
          <span className="mr-2 text-gray-400 font-bold">$</span>
          <input
            {...register('amount', {
              required: 'Amount is required',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Max 2 decimal places'
              },
              min: { value: 0.01, message: 'Must be positive' }
            })}
            className="input w-full rounded-2xl px-4 py-3 bg-[#23232a] text-gray-100 border border-[#31313a] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-medium placeholder-gray-500"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
          />
        </div>
        {errors.amount && <span className="text-red-400 text-xs mt-1">{errors.amount.message}</span>}
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-200 tracking-wide">Category</label>
        <select
          {...register('category', { required: true })}
          className="select w-full rounded-2xl px-4 py-3 bg-[#23232a] text-gray-100 border border-[#31313a] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-medium"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="text-red-400 text-xs mt-1">Category is required</span>}
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-200 tracking-wide">Date</label>
        <input
          {...register('date', { required: true })}
          className="input w-full rounded-2xl px-4 py-3 bg-[#23232a] text-gray-100 border border-[#31313a] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-medium"
          type="date"
          max={format(new Date(), 'yyyy-MM-dd')}
        />
        {errors.date && <span className="text-red-400 text-xs mt-1">Date is required</span>}
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-200 tracking-wide">Description</label>
        <textarea
          {...register('description', { maxLength: 500 })}
          className="textarea w-full rounded-2xl px-4 py-3 bg-[#23232a] text-gray-100 border border-[#31313a] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-medium placeholder-gray-500"
          maxLength={500}
          placeholder="Optional description"
        />
        {errors.description && <span className="text-red-400 text-xs mt-1">Max 500 characters</span>}
      </div>
      <div className="flex gap-3 justify-end mt-6">
        <button type="submit" className="btn btn-primary px-8 py-2 rounded-2xl shadow-md font-semibold tracking-wide bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" disabled={loading || isSubmitting}>
          {initialData ? 'Update' : 'Add'} Expense
        </button>
        {initialData && (
          <button type="button" className="btn btn-secondary px-8 py-2 rounded-2xl shadow font-semibold tracking-wide bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-105 transition-all duration-200" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
