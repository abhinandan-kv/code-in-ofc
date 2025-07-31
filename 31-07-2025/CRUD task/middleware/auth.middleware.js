import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token:-", token);

  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

    req.user = decoded;
    console.log("Decoded :- ",decoded);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send(err);
  }
};

export default verifyToken;
