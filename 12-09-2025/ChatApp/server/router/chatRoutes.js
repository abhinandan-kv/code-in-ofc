import express, { Router } from "express";
import { createGroup, getGroupMembers, getGroups, getMessages, getUsers } from "../controllers/chatController.js";

const chatRouter = Router();

// did not added middlare becz these are accessable from /chatapp and routes are not exposed directly

chatRouter.get("/users", getUsers);
chatRouter.get("/groups", getGroups);
chatRouter.get("/messages", getMessages);
chatRouter.post("/groups", createGroup)
chatRouter.get("/groups/:id/members", getGroupMembers);

export default chatRouter;
