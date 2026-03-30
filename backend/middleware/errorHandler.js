const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Axios errors (OMDB API issues)
  if (err.response) {
    return res.status(err.response.status || 500).json({
      error: 'External API error',
      message: err.response.data?.Error || err.message,
    });
  }

  if (err.request) {
    return res.status(503).json({
      error: 'Service unavailable',
      message: 'Could not connect to movie database. Please try again.',
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      message: err.message,
    });
  }

  // Default error
  const statusCode = err.statusCode || err.status || 500;
  return res.status(statusCode).json({
    error: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
