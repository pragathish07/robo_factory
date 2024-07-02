require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

const userMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];
  const tokens = token.split(" ")[1]
  
  if (!tokens) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(tokens, 'secret');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = userMiddleware;