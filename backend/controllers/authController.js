const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const { removeActiveUser } = require('../utils/activeUsers');


exports.registerUser = async (req, res) => {
  const { username, email, password, role, phone } = req.body;

  try {
    if (!username || !email || !password || !role || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const validRoles = ['admin', 'doctor', 'nurse', 'patient', 'staff','guardian'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified.' });
    }

    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or Email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword, role, phone });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error in registration:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.loginUser = async (req, res) => {
  const { role, username, password } = req.body;

  try {
    let user = await User.findOne({ role, username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid username or role' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const payload = { user: { id: user.id, role: user.role, username: user.username } };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token, user: payload.user });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }, '-password'); 

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.logoutUser = async (req, res) => {
  try {
    const { userId, role } = req.user; 

   
    removeActiveUser(userId, role);

    
    res.clearCookie('token'); 
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.findUser = async (username) => {
  try {
    
    const user = await User.findOne({ username: username });

    
    if (user) {
      return { exists: true, user };
    }

    return { exists: false };
  } catch (error) {
    console.error("Error in findUser:", error);
    return { exists: false, error: error.message };
  }
};
