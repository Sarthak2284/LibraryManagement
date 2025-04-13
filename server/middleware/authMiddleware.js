const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    // Remove the "Bearer" prefix if present
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
  
    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
  
      // Check if the user is an admin
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized as admin' });
      }
  
      // Pass the decoded information (user ID, role) to the next route handler
      req.user = decoded;
      next();
    });
  };
  

module.exports = authenticate;
