function validateMenuPayload(req, res, next) {
  const body = req.body;

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({
      error: 'Invalid Payload',
      message: 'Menu payload must be a non-null object.'
    });
  }

  // Prevent empty object
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      error: 'Empty Payload',
      message: 'Menu payload cannot be an empty object.'
    });
  }

  // Check prototype pollution keys
  const strBody = JSON.stringify(body);
  if (strBody.includes('"__proto__"') || strBody.includes('"constructor"') || strBody.includes('"prototype"')) {
    return res.status(400).json({
      error: 'Security Validation Failed',
      message: 'Forbidden property in payload.'
    });
  }

  // Body size sanity check (max 5MB)
  if (strBody.length > 5 * 1024 * 1024) {
    return res.status(413).json({
      error: 'Payload Too Large',
      message: 'Menu payload exceeds maximum allowed size.'
    });
  }

  next();
}

module.exports = {
  validateMenuPayload
};
