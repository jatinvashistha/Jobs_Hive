const jwt = require('jsonwebtoken')
const User = require('../models/User')
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.body;
  console.log(token, "the token is");

  if (!token) {
    return res.status(400).json({
      message: "Please login first",
    });
  }

  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({
      _id: id,
    });
    if (req.user !== null) {
      next();
    } else {
      return res.status(400).json({
        message: "User not found. Please login again",
      });
    }
  } catch (error) {
    // Handle invalid token error
    return res.status(401).json({
      message: "Invalid token. Please login again",
    });
  }
};
