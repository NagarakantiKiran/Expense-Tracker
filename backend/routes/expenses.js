const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, param } = require('express-validator');
const {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  bulkDeleteExpenses,
  duplicateExpense
} = require('../controllers/expenseController');

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

// Validation rules
const expenseValidation = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).trim(),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be positive').custom(v => /^\d+(\.\d{1,2})?$/.test(v)).withMessage('Amount must have up to 2 decimal places'),
  body('category').isIn(CATEGORIES).withMessage('Invalid category'),
  body('date').optional().isISO8601().toDate(),
  body('description').optional().isLength({ max: 500 }).trim()
];

// GET /api/expenses
router.get('/', auth, getAllExpenses);
// POST /api/expenses
router.post('/', auth, expenseValidation, createExpense);
// PUT /api/expenses/:id
router.put('/:id', auth, expenseValidation, updateExpense);
// DELETE /api/expenses/:id
router.delete('/:id', auth, deleteExpense);
// DELETE /api/expenses/bulk
router.delete('/bulk', auth, body('ids').isArray({ min: 1 }), bulkDeleteExpenses);
// POST /api/expenses/:id/duplicate
router.post('/:id/duplicate', auth, duplicateExpense);

module.exports = router;
