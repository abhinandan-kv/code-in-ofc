import query from "../../CRUD task/utils/query.js";
import sequelize from "../config/database.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function userSignUp(req, res) {
  const saltRound = 10;
  const { name, email, password, role } = req.body;
  const userData = req.body;
  const approved = "true";
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const createUser = async (userData) => {
      if (userData.role === "admin") {
        const existingAdmin = await User.findOne({ where: { role: "admin" } });
        if (existingAdmin) {
          throw new Error("An admin already exists. Only one admin is allowed.");
        } else {
          const newUser = await sequelize.query(
            `INSERT INTO users100 (name,email,hashedpassword,role,reference,approved) VALUES ('${name}','${email}','${hashedPassword}','${role}','Created by ${name}','${approved}')`
          );
          return newUser;
        }
      } else {
        const newUser = await sequelize.query(
          `INSERT INTO users100 (name,email,hashedpassword,role,reference,approved) VALUES ('${name}','${email}','${hashedPassword}','${role}','Created by ${name}','${approved}')`
        );

        return newUser;
      }
    };

    const result = await createUser(userData);

    res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

async function SignIn(req, res) {
  const { name, password } = req.body;

  console.log(name, password);

  if (!name || !password) {
    return res.status(404).send("name and password are required");
  }

  try {
    const getUserByname = (name) => {
      return new Promise((resolve, reject) => {
        User.findAll({ where: { name: name } })
          .then((users) => resolve(users))
          .catch((error) => reject(error));
      });
    };

    const result = await getUserByname(name);

    //console.log("result", result);

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("Invalid credentials");
    }

    const user = result[0];
    // console.log("User :-", user);
    //console.log("User password :- ", user.hashedpassword);

    const isPasswordValid = await bcrypt.compare(password, user.hashedpassword);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name, role: user.role, approved: user.approved },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res.status(200).send({ message: "Signin Successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

//for testing only
async function nextVerifyToken(req, res) {
  //console.log(req.user);

  res.json({ message: "Welcome to your profile !!! ", user: req.user });
}

async function signupAfterSignin(req, res) {
  const saltRound = 10;
  const { name, email, password, role } = req.body;
  const userData = req.body;

  const creatorName = req.user.name;
  const creatorRole = req.user.role;
  //console.log("creator name :", creatorName);

  const approved = "true";

  if (creatorRole == "admin") {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRound);

      const createUser = async (userData) => {
        if (userData.role === "admin") {
          const existingAdmin = await User.findOne({ where: { role: "admin" } });
          if (existingAdmin) {
            throw new Error("An admin already exists. Only one admin is allowed.");
          }
        } else {
          const newUser = await sequelize.query(
            `INSERT INTO users100 (name,email,hashedpassword,role,reference, approved) VALUES ('${name}','${email}','${hashedPassword}','${role}','Created by ${creatorName}', '${approved}')`
          );

          return newUser;
        }
      };

      const result = await createUser(userData);

      res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRound);

      const createUser = async (userData) => {
        if (userData.role === "admin") {
          const existingAdmin = await User.findOne({ where: { role: "admin" } });
          if (existingAdmin) {
            throw new Error("An admin already exists. Only one admin is allowed.");
          }
        } else {
          const newUser = await sequelize.query(
            `INSERT INTO users100 (name,email,hashedpassword,role,reference, approved) VALUES ('${name}','${email}','${hashedPassword}','${role}','Created by ${creatorName}' , 'false')`
          );

          return newUser;
        }
      };

      const result = await createUser(userData);

      res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
}

export { userSignUp, SignIn, nextVerifyToken, signupAfterSignin };
