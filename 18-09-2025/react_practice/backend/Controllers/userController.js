import User from "../Models/userModel.js";
import bcrypt, { hash } from "bcrypt";

const SALT_ROUNDS = 10;

export const signup = async (req, res) => {
  const { name, email, password, phoneNo } = req.body;

  console.log(req.body);
  try {
    if (!name || !email || !password) {
      return res.status(500).send({ message: "Values cant be empty" });
    }

    const checkUserExist = await User.findOne({ where: { email } });
    console.log("checkUserExist", checkUserExist);

    if (checkUserExist !== null) {
      return res.status(500).send({ message: "User Already Exist! Login" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await User.create({ userName: name, email: email, password: hashedPassword, phoneNo: phoneNo });
    console.log("result", result);
    res.status(200).send({ message: "User SignUp successful", response: result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

// after this ask for a 2fa popup in frontend

export const LoginIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(500).send({ message: "Values cant be empty" });
    }

    const userExist = await User.findOne({ where: { email: email } });

    if (userExist === null) {
      return res.status(500).send({ message: "User doesnot exist" });
    }

    const comparingPassword = await bcrypt.compare(password, SALT_ROUNDS);

    if (!comparingPassword) {
      return res.status(404).send({ message: "Wrong Password!" });
    }

    res.status(200).send({ message: "Login Successful" });

    //left to implement - handle here first
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};
