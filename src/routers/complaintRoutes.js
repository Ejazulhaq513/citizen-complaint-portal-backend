const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { 
  createComplaint, 
  getAllComplaints, 
  upvoteComplaint, 
  updateStatus,
  submitFeedback
} = require('../controllers/complaintController');

router.post('/', authMiddleware, createComplaint);
router.get('/', getAllComplaints);
router.patch('/:id/upvote', authMiddleware, upvoteComplaint);
router.patch('/:id/status', authMiddleware, updateStatus);
router.patch('/:id/feedback', authMiddleware, submitFeedback);

module.exports = router;