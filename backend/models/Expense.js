const mongoose = require('mongoose');

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Investment',
  'Other'
];

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
    validate: {
      validator: v => /^\d+(\.\d{1,2})?$/.test(v),
      message: 'Amount must be a positive number with up to 2 decimal places.'
    }
  },
  category: {
    type: String,
    required: true,
    enum: CATEGORIES,
    index: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, { timestamps: true });

expenseSchema.index({ userId: 1, date: -1, category: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
