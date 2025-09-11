import Users from "../models/userModel.js";

export const postNewMsg = async ({ email, from, to, msg, room }) => {
  try {
    // from , to , email, msg, room should be coming parent function
    // const result
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const listAllUsers = async () => {
  try {
    const result = await Users.findAll({ attributes: ['name', 'email'] });

    // console.log(JSON.stringify(result));

    return JSON.stringify(result)
  } catch (err) {
    console.error(err);
  }
};

