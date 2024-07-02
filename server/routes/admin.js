const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const verifySuperAdmin = require('../middleware/verifySuperAdmin');
const auth = require('../middleware/authenticate');
const userMiddleware = require('../middleware/user');


// Route to add an admin
router.post('/admin/add-admin', auth, verifySuperAdmin, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ error: 'User already exists.' });
      }
      user = new User({ name, email, password, role: 'admin' });
      await user.save();
      res.status(201).send({ message: 'Admin added successfully.' });
    } catch (error) {
      console.error('Error in add-admin route:', error); // Log the error
      res.status(500).send({ error: 'Server error in adding admin.' });
    }
  });


module.exports = router;
