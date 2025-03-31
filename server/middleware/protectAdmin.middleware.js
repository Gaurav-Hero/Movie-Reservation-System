import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  let token;
  console.log("Protect Route Middleware Triggered");

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("User not found in database");
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
      }

      console.log("User found:", req.user);
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No token provided");
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

export default protectRoute;
