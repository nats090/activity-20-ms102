// backend/src/server.js

require('dotenv').config();
const path = require('path');
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

// 1. HTTP request logging
app.use(morgan('dev'));

// 2. Secure headers with CSP and reporting
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...contentSecurityPolicy.directives,
      reportUri: '/csp-report'
    }
  })
);

// 3. Enable CORS for your React app
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  })
);

// 4. Body parsers & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 5. Rate limiting on login endpoint
app.use('/api/auth/login', limiter);

// 6. CSP violation report receiver
app.post(
  '/csp-report',
  express.json({ type: ['application/csp-report', 'application/json'] }),
  (req, res) => {
    console.warn('CSP Violation:', JSON.stringify(req.body, null, 2));
    res.status(204).end();
  }
);

// 7. Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/redirect', redirectRoutes);

// 8. Serve React’s production build
//    Adjust the path if your frontend folder is elsewhere
app.use(
  express.static(
    path.join(__dirname, '..', '..', 'frontend', 'build')
  )
);

// 9. Fallback: for any non-API and non-CSP-report GET, serve index.html
app.get('*', (req, res) => {
  if (
    req.path.startsWith('/api/') ||
    req.path === '/csp-report'
  ) {
    return res.status(404).json({ error: 'Not Found' });
  }
  res.sendFile(
    path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html')
  );
});

// 10. Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

// 11. Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});