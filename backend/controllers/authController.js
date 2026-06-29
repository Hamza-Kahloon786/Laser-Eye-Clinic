const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const formatUser = (user) => ({
  id:       user._id,
  username: user.username,
  name:     user.name,
  role:     user.role,
  ini:      user.getInitials(),
});

exports.login = async (req, res) => {
  console.log('[LOGIN] Request received:', req.body);
  try {
    const { username, password } = req.body;
    console.log('[LOGIN] username:', username, '| password provided:', !!password);

    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required' });

    const user = await User.findOne({ username: username.toLowerCase() });
    console.log('[LOGIN] User found:', user ? user.username : 'NOT FOUND');

    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const passwordMatch = await user.comparePassword(password);
    console.log('[LOGIN] Password match:', passwordMatch);

    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid username or password' });

    console.log('[LOGIN] JWT_SECRET exists:', !!process.env.JWT_SECRET);
    const token = signToken(user._id);
    console.log('[LOGIN] Token generated successfully');

    res.json({ success: true, token, user: formatUser(user) });
  } catch (err) {
    console.error('[LOGIN] ERROR:', err.message, err.stack);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({ success: true, user: formatUser(req.user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.seedUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    if (count > 0) return res.json({ message: 'Users already seeded', count });
    await User.insertMany([
      { username: 'admin', password: 'admin123', name: 'Dr. Usman Ahmed', role: 'Doctor' },
      { username: 'staff', password: 'staff123', name: 'Ayesha Khan',    role: 'Receptionist' },
    ]);
    res.json({ success: true, message: 'Default users created (admin/admin123 and staff/staff123)' });
  } catch (err) {
    res.status(500).json({ message: 'Seed error', error: err.message });
  }
};