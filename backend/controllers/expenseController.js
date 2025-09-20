const Expense = require('../models/Expense');
const { validationResult } = require('express-validator');
const { getWeekRange, getMonthRange, getYearRange } = require('../utils/dateHelpers');

// GET /api/expenses?category=&startDate=&endDate=&page=&limit=
exports.getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, startDate, endDate, page = 1, limit = 10, search } = req.query;
    const filter = { userId };
    if (category && category !== 'all') filter.category = category;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Expense.countDocuments(filter);
    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    res.json({ expenses, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/expenses
exports.createExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, amount, category, date, description } = req.body;
    const expense = await Expense.create({
      userId: req.user.id,
      title,
      amount,
      category,
      date,
      description
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/expenses/:id
exports.updateExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.id });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    Object.assign(expense, req.body);
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/expenses/:id
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/expenses/bulk
exports.bulkDeleteExpenses = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No expense IDs provided' });
    }
    const result = await Expense.deleteMany({ _id: { $in: ids }, userId: req.user.id });
    res.json({ message: `${result.deletedCount} expenses deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/expenses/:id/duplicate
exports.duplicateExpense = async (req, res) => {
  try {
    const orig = await Expense.findOne({ _id: req.params.id, userId: req.user.id });
    if (!orig) return res.status(404).json({ message: 'Expense not found' });
    const { title, amount, category, description } = orig;
    const newExpense = await Expense.create({
      userId: req.user.id,
      title,
      amount,
      category,
      date: req.body.date || new Date(),
      description
    });
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { period, category, startDate, endDate } = req.query;
    const userId = req.user.id;
    let dateFilter = {};
    if (period) {
      const now = new Date();
      let range;
      switch (period) {
        case 'week': range = getWeekRange(now); break;
        case 'month': range = getMonthRange(now); break;
        case 'year': range = getYearRange(now); break;
      }
      if (range) {
        dateFilter = { date: { $gte: range.startDate, $lte: range.endDate } };
      }
    } else if (startDate && endDate) {
      dateFilter = { date: { $gte: new Date(startDate), $lte: new Date(endDate) } };
    }
    const filter = { userId, ...dateFilter };
    if (category && category !== 'all') filter.category = category;
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId });
    // Pie chart data
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    // Bar chart data (monthly)
    const groupedData = {};
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      groupedData[key] = (groupedData[key] || 0) + expense.amount;
    });
    res.json({ categoryTotals, groupedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
