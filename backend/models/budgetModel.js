const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
