const User = require('../models/User');

const verifySuperAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Not authenticated.' });
    }
    const user = await User.findById(req.user._id);
    if (user.role !== 'superadmin') {
      return res.status(403).send({ error: 'Access denied. Not a superadmin.' });
    }
    next();
  } catch (error) {
    console.error('Error in verifySuperAdmin middleware:', error); // Log the error
    res.status(500).send({ error: 'Server error in superadmin verification.' });
  }
};

module.exports = verifySuperAdmin;
