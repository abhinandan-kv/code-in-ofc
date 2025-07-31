import connection from "../config/database.js";
import bcrypt, { hash } from "bcrypt";
import query from "../utils/query.js";
import userTableCreate from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { WebSocket } from "ws";

userTableCreate() //comment it out after first run

// table schema
// CREATE TABLE IF NOT EXISTS newusertable(
//     user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL UNIQUE, 
//     email VARCHAR(100) NOT NULL UNIQUE, 
//     password_hash VARCHAR(255) NOT NULL, 
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
//     CONSTRAINT check_email_format CHECK(email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
// )

const SignUp = async (req, res) => {
  const saltRound = 10;
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);

    connection.query(query.insert, [username, email, hashedPassword], (err, result, fields) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      console.log(result);
      console.log(fields);
      return res.send("User created successfully");
    });

    console.log("Hashed Password:", hashedPassword);
    console.log("Username:", username, "Email:", email);
    console.log("Query:", query);
  } catch (err) {
    console.error("Error during password hashing or database query:", err);
    return res.status(500).send("Server error");
  }
};

// things i will receive from user

// {
//     "username": "Viewsonic",
//     "email" : "vw@gmail.com",
//     "password" : "something",
// }

const SignIn = async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  if (!username || !password) {
    return res.status(404).send("Username and password are required");
  }

  try {
    const getUserByUsername = (username) => {
      return new Promise((resolve, reject) => {
        connection.query(query.findrow, [username], (err, result, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    };

    const result = await getUserByUsername(username);

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("Invalid credentials");
    }

    const user = result[0];
    console.log("User :-", user);
    console.log("User password :- ", user.password_hash);

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });

    res.status(200).send({ message: "Signin Successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const nextVerifyToken = (req, res) => {
  //console.log(req.user);
  res.json({ message: "Welcome to your profile !!! ", user: req.user });
};

const listAllUsers = (req, res) => {
  connection.query(query.listAll, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json(results);
  });
};
const listAllUsersForce = (req, res) => {
  connection.query(query.listAllForce, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json(result);
  });
};
const updateName = (req, res) => {
  const { oldname, newname } = req.body;
  connection.query(query.update, [newname, oldname], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json(result);
  });
};

const deleteUser = (req, res) => {
  const { name, email } = req.body;
  connection.query(query.softdelete, [name, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json(result);
  });
};

const deleteUserForce = (_, res) => {
  connection.query(query.hardDeleteMarkedMultipleRows, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json(result);
  });
};



export { SignUp, SignIn, nextVerifyToken, listAllUsers, updateName, listAllUsersForce, deleteUser, deleteUserForce };
