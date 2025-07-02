// Import the shared in-memory users array
const { users } = require('./authController');

exports.getUsers = (req, res) => {
  try {
    // Only return non-sensitive fields
    const list = users.map(u => ({ email: u.email }));
    res.json(list);
  } catch (err) {
    console.error('GetUsers error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
