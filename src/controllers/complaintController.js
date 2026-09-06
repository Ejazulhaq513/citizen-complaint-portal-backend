const Complaint = require('../models/complaint');

// 1. Nayi complaint add karna
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, area } = req.body;
    const complaint = new Complaint({
      title,
      description,
      category,
      area,
      createdBy: req.user.id || req.user.userId
    });
    await complaint.save();
    res.status(201).json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Tamam complaints get karna (Priority Calculate karke)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }).populate('createdBy', 'name email');
    
    // Priority Score Compute karna
    const result = complaints.map(c => {
      const days = Math.floor((new Date() - new Date(c.createdAt)) / (1000 * 60 * 60 * 24));
      const score = (c.upvotes * 2) + days;
      let priority = 'Low';
      if (score >= 30) priority = 'Critical';
      else if (score >= 16) priority = 'High';
      else if (score >= 5) priority = 'Medium';

      return { ...c._doc, priority, priorityScore: score, ageInDays: days };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Upvote karna
exports.upvoteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    ).populate('createdBy', 'name email');
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Officer status update karein
exports.updateStatus = async (req, res) => {
  try {
    const { status, officerRemark } = req.body;
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (officerRemark !== undefined) updateData.officerRemark = officerRemark;
    if (status === 'Resolved') updateData.feedbackPending = true;

    const complaint = await Complaint.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('createdBy', 'name email');
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Citizen Feedback submit karein
exports.submitFeedback = async (req, res) => {
  try {
    const { feedbackRating, feedbackComment } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        feedbackRating: Number(feedbackRating) || 5,
        feedbackComment: feedbackComment || '',
        feedbackPending: false
      },
      { new: true }
    ).populate('createdBy', 'name email');

    res.json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};