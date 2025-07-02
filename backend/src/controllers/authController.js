const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { setTokenCookie, clearTokenCookie, verifyToken } = require('../utils/jwt');

// In-memory user store. Exported at bottom so userController can import it.
const users = [];

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    users.push({ email, password: hash });
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    setTokenCookie(res, { email });
    return res.json({ message: 'Logged in' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
};

exports.logout = (req, res) => {
  clearTokenCookie(res);
  res.json({ message: 'Logged out' });
};

exports.me = (req, res) => {
  try {
    const payload = verifyToken(req.cookies.token);
    res.json({ email: payload.email });
  } catch {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// Export users array so userController can access it
exports.users = users;
