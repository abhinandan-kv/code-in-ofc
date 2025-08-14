import jwt from "jsonwebtoken";

export default async function verifyToken(req,res,next) {
  const userToken = req.headers.authorization?.split(" ")[1] 
console.log("userToken:- ",userToken)
  try {
    if (!userToken) {
      return res.status(403).send("No token provided");
    }
    const validate = jwt.verify(userToken, process.env.JWT_SECRET);
    req.user = validate;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
