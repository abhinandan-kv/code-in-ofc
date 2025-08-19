import sequelize from "../config/database.js";
import UserTable from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10; //this will degrades performance(or you can say takes more time to encypt) as you increase this 10 is good enough

export async function signUp(req, res) {
  const { name, email, phoneNumber, password, dob, role } = req.body;

  if (!name || !email || !phoneNumber || !password || !dob) {
    res.status(400).send("Values cant be empty");
  }

  if (phoneNumber.length < 8 || phoneNumber > 10) {
    res.status(416).send("Phone number should be atleast 8 digits and max 10 digits");
  }

  try {
    const emailExists = await UserTable.findOne({ where: { email: email } });

    if (emailExists) {
      res.status(400).send("User already exists, Kindly Login!");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userCreation = await UserTable.create({ name: name, email: email, phoneNumber: phoneNumber, password: hashedPassword, dob: dob });

    res.status(200).json({ message: "User Created Successfully", response: userCreation.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Values cant be empty");
  }

  try {
    const userDetail = await UserTable.findOne({ where: { email: email } });

    if (!userDetail) {
      res.status(404).send("User Not Found, Please signIn");
    }

    const comparePassword = await bcrypt.compare(password, userDetail.password);

    if (!comparePassword) {
      res.status(401).send("Password does not match");
    }

    if (!userDetail.isActive) {
      res.status(401).send("Your account is not activated yet wait for some time :)");
    }

    const tokenGen = jwt.sign(
      { id: userDetail.id, name: userDetail.name, role: userDetail.role, email: userDetail.email, phoneNumber: userDetail.phoneNumber },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", tokenGen, { maxAge: new Date(Date.now() + 3600000), httpOnly: true }); //1hour same as jwt expires time
    res.status(200).json({ message: "Login Successfully", token: { tokenGen } });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function changePasswordAfterLogin(req, res) {
  const { id, email } = req.user;
  const { password } = req.body;

  try {
    const newPasswordHashed = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await UserTable.update({ password: newPasswordHashed }, { where: { id: id } });

    const userDetail = await UserTable.findByPk(id);

    res.status(200).json({ message: "Password updated successfully", updatedData: userDetail });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function forgotPassword(req,res){
    const {id, email} = req.user;
    const {password} = req.body;

    try{
        const tempToken = crypto.getRandomValues //handling now
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

export async function verifyExample(req, res) {
  console.log(req.user);
  res.status(200).send("verifyToken Middleware Working Fine", req.user);
}

//admin ops
export async function listAllUsers(req, res) {
  const { role } = req.body;

  try {
    if (role != "admin") {
      res.status(401).status("Only admin can access.");
    }
    const result = await UserTable.findAll();

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function activateAccount(req, res) {
  const userId = req.params.id;
  const { id, name, role, email } = req.body;

  try {
    if (role != "admin") {
      res.status(401).status("Only admin can access");
    }

    const result = await UserTable.update({ isActive: true, approvedBy: `Approved By ${name} email:${email}` }, { where: { id: userId } });
    const newData = await UserTable.findByPk(userId);

    res.status(200).json({ message: "data updated sucessfully", newData });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
