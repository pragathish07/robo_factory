const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization header not provided.' });
  }
  
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token,'secret');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send({ error: 'Invalid token.' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    res.status(500).send({ error: 'Server error in authentication.' });
  }
};

module.exports = auth;
