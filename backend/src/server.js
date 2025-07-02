require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { limiter } = require('./middleware/rateLimiter');
const { contentSecurityPolicy } = require('./config/helmetConfig');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const redirectRoutes = require('./routes/redirect');

const app = express();

// 1. Logging
app.use(morgan('dev'));

// 2. Secure headers
app.use(helmet({ contentSecurityPolicy }));

// 3. CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

// 4. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 5. Cookies
app.use(cookieParser());

// 6. Rate limit login
app.use('/api/auth/login', limiter);

// 7. Health-check
app.get('/', (req, res) => res.json({ status: 'OK' }));

// 8. Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/redirect', redirectRoutes);

// 9. 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// 10. Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

// 11. Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
