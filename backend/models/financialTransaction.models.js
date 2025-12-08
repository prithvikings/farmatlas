import mongoose from "mongoose";

const FinancialTransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
  category: { 
    type: String, 
    enum: ["FEED", "MEDICINE", "EQUIPMENT", "SALES", "OTHER"], 
    required: true 
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const FinancialTransaction = mongoose.model('FinancialTransaction', FinancialTransactionSchema);
export default FinancialTransaction;