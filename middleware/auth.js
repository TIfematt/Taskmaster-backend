import jwt from "jsonwebtoken";

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1]; 
//   console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};

export default auth;
