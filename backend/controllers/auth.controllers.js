const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const WithdrawalForm = require('../models/withdrawalForm');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// User registration endpoint
router.post('/register', async (req, res) => {
  const { username, password, email, role } = req.body;

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create a new user
  const user = new User({
    username,
    password: hashedPassword,
    email,
    role
  });

  // Save the user to the database
  try {
    const savedUser = await user.save();
    res.json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Create a JWT and send it in the response
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
});