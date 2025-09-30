import jwt from "jsonwebtoken";

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    console.log("token", token);
    if (!token) {
      res.status(500).send({ message: "No token provided" });
    }
    const verifed = jwt.verify(token, process.env.JWT_KEY);

    if (verifed) {
      const decoded = jwt.decode(token);
      console.log(decoded);
      req.user = decoded;
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

export default verifyToken;
