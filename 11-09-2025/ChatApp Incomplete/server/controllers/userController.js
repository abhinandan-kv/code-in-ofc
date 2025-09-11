import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const SALT_ROUNDS = 10;

export const check = (_, res) => {
  res.send("The World is so beautiful");
};

export const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(username, email, password);

    if (!username || !email || !password) {
      return res.status(403).send("Values cant be empty");
    }

    //not writing code to find user in db before creating new one becz db schema already has email unique constraint.

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userCreated = await Users.create({ name: username, email: email, hashedPassword: hashedPassword });

    res.status(200).send({ message: "User Created Successfully", response: userCreated });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).send("Values cant be empty");
    }

    const findUserInDB = await Users.findOne({ where: { email: email } });

    if (!findUserInDB) {
      return res.status(404).send({ message: "User Already Exist" });
    }

    const hashedPassword = findUserInDB.dataValues.hashedPassword;
    const comparePassword = await bcrypt.compare(password, hashedPassword);

    if (!comparePassword) {
      return res.status(403).send({ message: "Wrong Password" });
    }

    // console.log(findUserInDB.dataValues.name);
    const payload = {
      name: findUserInDB.dataValues.name,
      email: findUserInDB.dataValues.email,
    };

    const tokenGen = jwt.sign(payload, process.env.jwt_key, { expiresIn: "48h" });

    res.cookie("token", tokenGen, { maxAge: 172800000, httpOnly: true }); //48h

    res.status(200).send({ message: "Login Successful", response: findUserInDB, token: tokenGen });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

//auth verify
export const verify = (req, res) => {
  res.status(200).send("Verify Route!!!");
};

export const verifyAuth = (req, res) => {
  try {
    res.status(200).send({ message: "Welcome Auth completed" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error! Re-login" });
  }
};

export const userDetails = (req, res) => {
  try {
    const { name, email } = req.user;

    res.status(200).send({ message: "User Data retrieved successfully", response: { name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};


