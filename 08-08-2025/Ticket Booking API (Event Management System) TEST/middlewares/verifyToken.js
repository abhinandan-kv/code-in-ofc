import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(300).send("No token provided");
    }
    const decoded = jwt.verify(token, "default_secret");
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export default verifyToken;
