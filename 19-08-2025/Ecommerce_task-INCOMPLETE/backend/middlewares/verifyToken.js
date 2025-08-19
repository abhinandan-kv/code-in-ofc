import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1] || req.cookie.token;

  try {
    if (!token) {
      res.status(400).send("Token not provided");
    }

    const decoded = jwt.verify(token, process.dotenv.JWT_KEY);

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
