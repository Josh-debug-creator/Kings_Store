import jwt from "jsonwebtoken";
import configVariables from "../Config/config.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    // Check for token presence
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing or invalid token" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
  console.log(token)

  // if no token
     if (!token) {
      res.status(401).json({status:false, error: 'Authentication failed: Token not provided.'});
      // throw new Error('Authentication failed: Token not provided.');
    }

    // Verify token
    const decodedToken = jwt.verify(token, configVariables.JWT_SECRET);
      console.log(decodedToken);
   
req.user = await User.findById(decodedToken.userId).select('-password');
    // Proceed if token is valid
    next();


// if no decoded token
  if (!decodedToken) {
      res.statusCode = 401;
      throw new Error('Authentication failed: Invalid token.');
    }


  } catch (err) {
    console.error("Authentication error:", err.message);
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};


  // Middleware to check if the user is an admin.
const admin = (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.statusCode = 401;
      throw new Error('Authorization failed: Not authorized as an admin.');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
