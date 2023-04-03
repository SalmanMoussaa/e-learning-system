const express = require('express');
const router = express.Router();
const { authenticate, isAdmin, validateRequestBody } = require('../middlewares');
const { User, Course, Enrollment, Withdrawal } = require('../models');
// User routes
router.post('/users', validateRequestBody, async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.post('/users/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (error) {
      res.status(400).send({ error: 'Unable to login.' });
    }
  });
  
  router.post('/users/logout', authenticate, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send();
    }
  });
  
  router.post('/users/logoutAll', authenticate, async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send();
    }
  });
  
  router.get('/users/me', authenticate, async (req, res) => {
    res.send(req.user);
  });
  
  // Course routes
  router.post('/courses', authenticate, isAdmin, async (req, res) => {
    const course = new Course(req.body);
    try {
      await course.save();
      res.status(201).send(course);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.get('/courses', authenticate, async (req, res) => {
    try {
      const courses = await Course.find({});
      res.send(courses);
    } catch (error) {
      res.status(500).send();
    }
  });
  
  // Enrollment routes
  router.post('/enrollments', authenticate, async (req, res) => {
    const enrollment = new Enrollment({
      studentId: req.user._id,
      courseId: req.body.courseId
    });
    try {
      await enrollment.save();
      res.status(201).send(enrollment);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.get('/enrollments', authenticate, async (req, res) => {
    try {
      const enrollments = await Enrollment.find({ studentId: req.user._id });
      res.send(enrollments);
    } catch (error) {
      res.status(500).send();
    }
  });
  
  router.delete('/enrollments/:id', authenticate, async (req, res) => {
    const _id = req.params.id;
    try {
      const enrollment = await Enrollment.findOneAndDelete({ _id, studentId: req.user._id });
      if (!enrollment) {
        res.status(404).send();
      } else {
        res.send(enrollment);
      }
    } catch (error) {
      res.status(500).send();
    }
  });
  
  // Withdrawal routes
  router.post('/withdrawals', authenticate, async (req, res) => {
    const withdrawal = new Withdrawal({
      studentId: req.user._id,
      courseId: req.course._id
    });
    try {
    await withdrawal.save();
    res.status(201).send(withdrawal);
    } catch (error) {
    res.status(400).send(error);
    }
    });
    
    router.get('/withdrawals', authenticate, isAdmin, async (req, res) => {
    try {
    const withdrawals = await Withdrawal.find({});
    res.send(withdrawals);
    } catch (error) {
    res.status(500).send();
    }
    });
    
    router.patch('/withdrawals/:id', authenticate, isAdmin, async (req, res) => {
    const _id = req.params.id;
    const { status } = req.body;
    try {
    const withdrawal = await Withdrawal.findOne({ _id });
    if (!withdrawal) {
    res.status(404).send();
    } else {
    withdrawal.status = status;
    await withdrawal.save();
    res.send(withdrawal);
    }
    } catch (error) {
    res.status(400).send(error);
    }
    });
    
    module.exports = router;