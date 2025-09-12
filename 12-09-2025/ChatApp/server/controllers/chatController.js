import Users from "../models/userModel.js";
import Group from "../models/group.js";
import GroupMember from "../models/groupMember.js";
import UserMessages from "../models/userMessages.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.status(200).json(users);
  } catch (err) {
    console.error("getUsers error", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({ attributes: ["id", "name"] });
    res.status(200).json(groups);
  } catch (err) {
    console.error("getGroups error", err);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { user1, user2, room, groupId } = req.query;
    let where = {};

    if (user1 && user2) {
      where = {
        [Op.or]: [
          { from: user1, to: user2 },
          { from: user2, to: user1 },
        ],
      };
    } else if (room) {
      where = { room };
    } else if (groupId) {
      where = { groupId };
    }

    const msgs = await UserMessages.findAll({
      where,
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json(msgs);
  } catch (err) {
    console.error("getMessages error", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    if (!name || !members?.length) {
      return res.status(400).json({ error: "Group name and members required" });
    }

    const group = await Group.create({ name });

    const users = await Users.findAll({ where: { email: members } });

    await Promise.all(users.map((u) => GroupMember.create({ groupId: group.id, userId: u.id })));

    res.status(200).json({ group, members: users });
  } catch (err) {
    console.error("createGroup error", err);
    res.status(500).json({ error: "Failed to create group" });
  }
};

export const getGroupMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const members = await GroupMember.findAll({
      where: { groupId: id },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json(members.map((m) => m.user));
  } catch (err) {
    console.error("getGroupMembers error", err);
    res.status(500).json({ error: "Failed to fetch group members" });
  }
};
