import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRefreshToken, Users } from "../models/index.js";

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

    const accessToken = jwt.sign(payload, process.env.jwt_key, { expiresIn: "48h" });

    const refreshToken = jwt.sign({ id: findUserInDB.dataValues.id }, process.env.jwt_key, { expiresIn: "168h" });

    const refreshTokenFetch = await userRefreshToken.findOne({ userId: findUserInDB.dataValues.id });

    if (refreshTokenFetch) {
      const updateRefreshToken = await userRefreshToken.update({ refreshToken: refreshToken }, { where: { userId: findUserInDB.dataValues.id } });
      console.log(`RefreshToken updated ${updateRefreshToken}`);
    } else {
      const saveRefreshToken = await userRefreshToken.create({ refreshToken: refreshToken, userId: findUserInDB.dataValues.id });
    }

    res.cookie("refreshToken", refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.cookie("accessToken", accessToken, { maxAge: 172800000, httpOnly: true }); //48h

    res.status(200).send({ message: "Login Successful", response: findUserInDB, accessToken: accessToken, refreshToken: refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

//auth verify
export const verify = (req, res) => {
  res.status(200).send({ message: "Verify Route!!!", response: req.user });
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
