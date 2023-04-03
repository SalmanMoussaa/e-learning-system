const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authroutes = require('./routes/auth.routes');
const path = require('path');const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use(authroutes);


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/elearning', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});