const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth', required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  receipt: { type: String }, // Will store receipt path
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
