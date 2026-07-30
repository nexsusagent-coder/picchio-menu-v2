function errorHandler(err, req, res, next) {
  console.error('[SERVER ERROR]', err);

  const status = err.status || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;

  res.status(status).json({
    error: err.name || 'Error',
    message
  });
}

module.exports = errorHandler;
