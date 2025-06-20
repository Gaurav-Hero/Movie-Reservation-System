import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Received Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT Decoded:", decoded);

    req.user = decoded; // { id, role, etc. }
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};


// Only for admin routes
export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Admin access required' });
  }
};
