const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

module.exports = {
  errorHandler,
};
