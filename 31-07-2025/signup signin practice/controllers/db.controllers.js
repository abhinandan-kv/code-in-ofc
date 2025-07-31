import bcrypt from "bcrypt";
import query from "../query.js";

async function createNewUser(req, res) {
  const saltRound = 10;
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    console.log(hashedPassword);


    connection.query(query.addUser, [username, email, hashedPassword], (err, result, fields) => {
      if (err) {
        console.error(err);
        res.status(400).send(err);
      }
      console.log(result, fields);
      res.send(result);
    });

    
  } catch (err) {
    console.error("Error during hashing and db connection", err);
    res.status(500).send(err);
  }
}

export { createNewUser };
