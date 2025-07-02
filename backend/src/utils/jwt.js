const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'token';
const opts = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
};

exports.setTokenCookie = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '20m'
  });
  res.cookie(COOKIE_NAME, token, opts);
};

exports.clearTokenCookie = (res) => {
  res.clearCookie(COOKIE_NAME, opts);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
