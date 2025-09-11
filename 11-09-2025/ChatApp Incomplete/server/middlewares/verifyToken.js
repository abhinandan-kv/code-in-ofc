import jwt from "jsonwebtoken";

export default  function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token || req.params.token  ;

  try {
    // console.log("token- ", token);

    if (!token) {
      res.status(500).send({ message: "No token provided" });
    }

    const decoded =  jwt.verify(token, process.env.jwt_key);

    // console.log(decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
  }
}
