import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token || req.params.token;
  console.log("Token:- ", token);
  try {
    if (!token) {
      return res.status(401).send("Token not provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json(err);
  }
}
