const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const WithdrawalForm = require('../models/withdrawalForm');
// Enroll in a course endpoint
router.post('/enroll', async (req, res) => {
    const { courseId } = req.body;
    const userId = req.userId;
  
    // Find the course by ID
    const course = await Course.findById(courseId);
  
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
  
    // Add the user ID to the course's enrolledStudents array
    course.enrolledStudents.push(userId);
  
    // Save the course to the database
    try {
      const savedCourse = await course.save();
      res.json({ message: 'Enrolled successfully!' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // List students enrolled in a course endpoint
  router.get('/course/:id/students', async (req, res) => {
    const courseId = req.params.id;
  
    // Find the course by ID and populate the enrolledStudents field with the user objects
    const course = await Course.findById(courseId).populate('enrolledStudents', 'username email');
  
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
  
    res.json({ students: course.enrolledStudents });
  });
  
  // Upload a file endpoint
  router.post('/upload', async (req, res) => {
    // TODO: Implement file upload using a file storage service like AWS S3 or Google Cloud Storage
    res.json({ message: 'File uploaded successfully!' });
  });
  
  // Apply for withdrawal from a course endpoint
  router.post('/withdrawal-form', async (req, res) => {
    const { courseId, reason } = req.body;
    const userId = req.userId;
  }); 
  // Create a new withdrawal form
  const withdrawalForm = new WithdrawalForm;

({
course: courseId,
student: userId,
reason
});

// Save the withdrawal form to the database
try {
const savedWithdrawalForm = await withdrawalForm.save();
res.json({ message: 'Withdrawal form submitted successfully!' });
} catch (err) {
res.status(400).json({ error: err.message });
}


// List withdrawal forms for a course endpoint
router.get('/course/:id/withdrawal-forms', async (req, res) => {
const courseId = req.params.id;

// Find the withdrawal forms for the course by ID and populate the student field with the user objects
const withdrawalForms = await WithdrawalForm.find({ course: courseId }).populate('student', 'username email');

if (!withdrawalForms) {
return res.status(404).json({ error: 'Withdrawal forms not found' });
}

res.json({ withdrawalForms });
});

// Approve or reject a withdrawal form endpoint
router.post('/withdrawal-form/:id', async (req, res) => {
const withdrawalFormId = req.params.id;
const { isApproved } = req.body;

// Find the withdrawal form by ID
const withdrawalForm = await WithdrawalForm.findById(withdrawalFormId);

if (!withdrawalForm) {
return res.status(404).json({ error: 'Withdrawal form not found' });
}

// Update the withdrawal form's status and save it to the database
withdrawalForm.isApproved = isApproved;

try {
const savedWithdrawalForm = await withdrawalForm.save();
res.json({ message: 'Withdrawal form updated successfully!' });
} catch (err) {
res.status(400).json({ error: err.message });
}
});

module.exports = router;
  