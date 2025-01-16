import jwt from "jsonwebtoken";
import configVariables from "../Config/config.js";

const adminAuth = (req, res, next) => {
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
    // Verify token
    const decodedToken = jwt.verify(token, configVariables.JWT_SECRET);
console.log(decodedToken);
   
    // Proceed if token is valid
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

export default adminAuth;
