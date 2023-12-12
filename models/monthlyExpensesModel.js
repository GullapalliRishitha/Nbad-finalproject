// expenseModel.js
const mongoose = require('mongoose');

const monthlyExpenseSchema = new mongoose.Schema({
  expense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expenses',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const MonthlyExpenses = mongoose.model('MonthlyExpenses', monthlyExpenseSchema);

module.exports = MonthlyExpenses;
