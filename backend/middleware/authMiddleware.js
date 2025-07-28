const jwt = require('jsonwebtoken');
const config = require('../config/config');


const authMiddleware = (req, res, next) => {
  
  const authHeader = req.header('Authorization');

 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }


  const token = authHeader.replace('Bearer ', '');


  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {

    const decoded = jwt.verify(token, config.JWT_SECRET);

  
    console.log('Decoded Token:', decoded);

   
    req.user = decoded.user;

 
    next();
  } catch (err) {
  
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token has expired' });
    } else {
      console.error('Token verification error:', err.message);
      return res.status(401).json({ success: false, message: 'Token verification failed' });
    }
  }
};


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), config.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = { authMiddleware, verifyToken };
