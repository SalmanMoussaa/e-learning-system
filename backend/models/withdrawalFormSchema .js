const mongoose = require('mongoose');
const withdrawalFormSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  }, { timestamps: true });
  const WithdrawalForm = mongoose.model('WithdrawalForm', withdrawalFormSchema);
  module.exports =  WithdrawalForm;
