const express = require('express');
const router = express.Router();
const menuService = require('../services/menu-service');

router.get('/menu', async (req, res, next) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    const result = await menuService.getMenu();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
