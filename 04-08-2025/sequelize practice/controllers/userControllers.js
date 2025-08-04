import User from "../model/userModel.js";

async function postNewUser(req, res) {
  const { name, email } = req.body;

  try {
    const result = await User.create({ name: name, email: email });
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).send(err);
  }
}



export { postNewUser };
