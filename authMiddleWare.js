const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

async function authenticateToken(req, res, next) {
  try {
    // Extract token from the Authorization header
    const token = req.header('Authorization');

    // Check if token is missing
    if (!token) {
      return res.sendStatus(401);
    }

    // Verify the token using the JWT_SECRET
    const user = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user information to the request
    req.user = user;

    // Check token expiration
    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (user.exp < currentTimestamp) {
      return res.status(401).json({ error: 'Token has expired. Please sign in again.' });
    }

    // Continue to the next middleware
    next();
  } catch (error) {
    // Handle token verification failure
    res.sendStatus(403);
  }
}

module.exports = authenticateToken;
