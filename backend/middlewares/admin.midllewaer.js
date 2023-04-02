const { User } = require('../models');
// Middleware function to check if user has admin role
const isAdmin = async (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send({ error: 'You are not authorized to perform this action.' });
    }
  };
  module.exports = isAdmin;