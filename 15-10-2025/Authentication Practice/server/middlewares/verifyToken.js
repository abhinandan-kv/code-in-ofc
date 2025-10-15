import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const refreshToken = req.cookies.refreshToken || req.params.refreshToken;
  const accessToken = req.headers.authorization?.split(" ")[1] || req.cookies.accessToken || req.params.accessToken;

  try {
    // console.log("token- ", token);

    if (!refreshToken) {
      res.status(500).send({ message: "No refreshToken Provided" });
    }
    if (!accessToken) {
      res.status(403).send({ message: "No accessToken Provided" });
    }

    const refreshTokenDecoded = jwt.verify(refreshToken, process.env.jwt_key);

    // const accessTokenDecoded = jwt.verify(accessToken, process.env.jwt_key);
    // =================    REFRESH TOKEN CREATED SUCCESSFULLY ================== 
    // =============== NOW NEED ANOTHER SERVER AS RESOURCE SERVER ===============
    // { id: 1, iat: 1760449608, exp: 1761054408 }


    // console.log(refreshTokenDecoded);
    // console.log(accessTokenDecoded);

    req.user = refreshTokenDecoded;

    console.log(req.user);
    next();
  } catch (err) {
    console.error(err);
  }
}
