const config = require('../config');

function originCheck(req, res, next) {
  const origin = req.headers.origin;
  
  if (!origin) {
    return next();
  }

  if (config.allowedOrigins.includes('*') || config.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
}

module.exports = originCheck;
