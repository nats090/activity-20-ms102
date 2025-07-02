const express = require('express');
const Joi = require('joi');
const { validateBody } = require('../middleware/validate');
const {
  register,
  login,
  logout,
  me
} = require('../controllers/authController');

const router = express.Router();

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

router.post('/register', validateBody(schema), register);
router.post('/login', validateBody(schema), login);
router.post('/logout', logout);
router.get('/me', me);

module.exports = router;
