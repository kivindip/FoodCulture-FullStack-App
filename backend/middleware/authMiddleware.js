const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  try {
    const token = authHeader.replace("Bearer ", "");

    const verified = jwt.verify(token, "secret_key");

    req.user = verified;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token."
    });
  }
};

module.exports = authMiddleware;