import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthTable from "../models/AuthModel.js";
import StudentTable from "../models/studentModel.js";

const SALT_ROUNDS = 10;

export async function signUp(req, res) {
  const { name, email, password, repeat_password, phone, role } = req.body;
  console.log(name, email, password, repeat_password, phone, role);
  try {
    if (!name || !email || !password || !repeat_password) {
      return res.status(200).send({ message: "Values Cannot be empty" });
    }

    if (password !== repeat_password) {
      return res.status(200).send({ message: "Password and confirm password should match!" });
    }

    const userExists = await AuthTable.findOne({ where: { email: email } });

    if (userExists) {
      return res.status(200).send({ message: "User already exists. Kindly Login!" });
    }

    const hashedPassword = await bcyrpt.hash(password, SALT_ROUNDS);

    const result = await AuthTable.create({ name: name, email: email, password: hashedPassword, phoneNo: phone, role: role });
    if (role === "Student" && result) {
      const newStudent = await StudentTable.create({ name: name, authId: result.dataValues.id });
      console.log(newStudent);
    }

    res.status(200).send({ message: "Signed Up successfully", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function loginIn(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(200).send({ message: "Enter Email and Password" });
    }

    const userExists = await AuthTable.findOne({ where: { email: email } });

    if (!userExists) {
      return res.status(200).send({ message: "User Doesnt exists Signup first!" });
    }

    const hashedPassword = userExists.dataValues.password;
    const comparePassword = await bcyrpt.compare(password, hashedPassword);

    if (!comparePassword) {
      return res.status(200).send({ message: "Wrong Credentials" });
    }

    const name = userExists.dataValues.name;
    const phoneNo = userExists.dataValues.phoneNo;
    const isActive = userExists.dataValues.isActive;
    const role = userExists.dataValues.role;
    const token = await jwt.sign({ name, email, phoneNo, isActive, role }, process.env.JWT_KEY, { expiresIn: "12h" });

    res.cookie("token", token, { expiresIn: "42200000" }); //12h in ms

    res.status(200).send({ message: "Login Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function verify(req, res) {
  try {
    res.status(200).send({ message: "Authorized" });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
}

