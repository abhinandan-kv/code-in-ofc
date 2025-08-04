import db from "../model/index.js";
const { User } = db;

export const postNewUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create user");
  }
};
