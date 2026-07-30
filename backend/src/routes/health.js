const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    return res.status(200).json({
      status: 'ok',
      database: 'connected'
    });
  } catch (err) {
    return res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: err.message
    });
  }
});

module.exports = router;
