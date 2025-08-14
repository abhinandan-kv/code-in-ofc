import bcrypt from "bcrypt";
import UserTable from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export async function postNewUser(req, res) {
  const { name, email, password } = req.body;
  const SALT_ROUND = 10;

  if (!name || !email || !password) {
    res.status(500).send("All fields should be filled");
  }
  //will handle dups email error also later

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    console.log(hashedPassword);

    const result = await UserTable.create({ name: name, email: email, password: hashedPassword });

    res.status(200).json("User Created Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const getUserFromDB = await UserTable.findOne({ where: { email: email } });
    const hashedPW = getUserFromDB.password;

    const matchPW = await bcrypt.compare(password, hashedPW);
    if (!getUserFromDB) {
      res.status(404).send("User not found! Sign Up pls");
    }
    if (!matchPW) {
      res.status(404).send("Wrong Password! recheck pls");
    }

    const token = jwt.sign({ id: getUserFromDB.id, name: getUserFromDB.name, email: getUserFromDB.email }, 
    process.env.JWT_SECRET, {
      expiresIn: "6hrs",
    });

    res.cookie('jwtToken', token, {
        httpOnly:false,
        maxAge:21600000,    //6hrs
        // sameSite:'Lax' // //none, strict
    })

    res.status(200).json({ token, message: "Signin Successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export  async function verifyExample(req,res){
    res.status(200).send("Verified okkkkk...")
}