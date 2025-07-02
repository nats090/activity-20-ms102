const express = require('express');
const { URL } = require('url');
const router = express.Router();

const validDomains = ['example.com', 'trusted.org'];

router.get('/', (req, res) => {
  try {
    const target = new URL(req.query.url);
    if (!validDomains.includes(target.hostname)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    res.redirect(target.toString());
  } catch {
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
