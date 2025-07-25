// const User = require('../models/user.model');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: 'User already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashed });

//     res.status(201).json({ user });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenService = require('../services/token.service');
const { validateRegister, validateLogin } = require('../utils/validators');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { email, password } = req.body;
    const { error } = validateLogin({ email, password });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokens = tokenService.generateTokens(user);
    res.cookie('refreshToken', tokens.refreshToken, tokenService.cookieOptions);
    res.json({ success: true, data: tokens });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
};
