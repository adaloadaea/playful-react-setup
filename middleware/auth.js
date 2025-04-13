
const isAuthenticated = (req, res, next) => {
  // No authentication check - always allow access
  next();
};

const isAdmin = (req, res, next) => {
  // No admin role check - always allow access
  next();
};

module.exports = { isAuthenticated, isAdmin };
