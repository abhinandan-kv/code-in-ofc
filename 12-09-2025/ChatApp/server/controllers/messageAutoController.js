import { Op } from "sequelize";
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
      const result = await Users.findAll({ attributes: ["name", "email"] });

      // console.log(JSON.stringify(result));

      return JSON.stringify(result);
   } catch (err) {
      console.error(err);
   }
};

export const getMessages = async (req, res) => {
   try {
      const { user1, user2, room, groupId } = req.query;
      let where = {};

      if (groupId) {
         where.groupId = groupId;
      } else if (room) {
         where.room = room;
      } else if (user1 && user2) {
         where = {
            [Op.or]: [
               { from: user1, to: user2 },
               { from: user2, to: user1 },
            ],
         };
      }

      const result = await UserMessages.findAll({
         where,
         order: [["createdAt", "ASC"]],
      });

      res.status(200).send(result);
   } catch (err) {
      res.status(500).send(err);
   }
};
