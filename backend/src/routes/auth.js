const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authService = require('../services/auth-service');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts max per IP
  message: {
    error: 'Too Many Requests',
    message: 'Too many failed login attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/auth/login', loginLimiter, async (req, res, next) => {
  try {
    const { password } = req.body || {};

    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        error: 'Invalid Request',
        message: 'Password parameter is required.'
      });
    }

    const isValid = await authService.verifyAdminPassword(password);

    if (!isValid) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid password.'
      });
    }

    // Set server-side session
    req.session.authenticated = true;
    req.session.user = 'admin';
    req.session.loginTime = new Date().toISOString();

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        username: 'admin',
        role: 'administrator'
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get('/auth/me', (req, res) => {
  if (req.session && req.session.authenticated) {
    return res.status(200).json({
      authenticated: true,
      user: {
        username: 'admin',
        role: 'administrator'
      }
    });
  }
  return res.status(200).json({
    authenticated: false
  });
});

router.post('/auth/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout Failed' });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  } else {
    return res.status(200).json({ success: true });
  }
});

module.exports = router;
