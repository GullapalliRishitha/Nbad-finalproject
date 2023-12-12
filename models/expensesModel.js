// expensesModel.js
const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  description: {
    type: String,
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
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;
