import jwt from "jsonwebtoken";

const authMiddleware = (req, res) => {
  const header = req.header["authorization"];
  const token = header && header.split("")[1];

  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
