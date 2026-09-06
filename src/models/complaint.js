const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Road', 'Garbage', 'Water', 'Electricity', 'Other'], required: true },
  area: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  upvotes: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  officerRemark: { type: String, default: '' },
  feedbackRating: { type: Number, default: 0 },
  feedbackComment: { type: String, default: '' },
  feedbackPending: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);