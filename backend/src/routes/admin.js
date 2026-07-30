const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authentication');
const { validateMenuPayload } = require('../middleware/validation');
const menuService = require('../services/menu-service');

router.get('/admin/menu', requireAuth, async (req, res, next) => {
  try {
    const result = await menuService.getMenu();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.put('/admin/menu', requireAuth, validateMenuPayload, async (req, res, next) => {
  try {
    const newData = req.body;
    const updatedBy = (req.session && req.session.user) ? req.session.user : 'admin';
    const result = await menuService.updateMenu(newData, updatedBy);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
