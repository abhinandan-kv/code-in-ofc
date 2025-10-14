import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const check = (_, res) => {
  res.send("The World is so beautiful");
};

//auth verify
export const verify = (req, res) => {
  res.status(200).send({ message: "Verify Route!!!", response: req.user });
};


