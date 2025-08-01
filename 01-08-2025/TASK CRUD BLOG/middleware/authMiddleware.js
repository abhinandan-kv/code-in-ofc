import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token:-", token);
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

    req.user = decoded;

    console.log("decoded", decoded);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send(err);
  }
};

const verifyAuthorized = async (req, res, next) => {
  const { name, email, password } = req.body;
  const getDataFromDb = await User.findOne({ where: { name: name } });

  //console.log("getDataFromDb",getDataFromDb);
  if (getDataFromDb.approved != true) {
    throw new Error("Your id is not yet approved");
  } else {
    next();
  }
};

export { verifyToken, verifyAuthorized };
