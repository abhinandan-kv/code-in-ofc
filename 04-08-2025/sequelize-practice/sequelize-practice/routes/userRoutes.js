import express from "express";
import { postNewUser } from "../controllers/userControllers.js";

const router = express.Router();
router.post("/post", postNewUser);

export default router;
