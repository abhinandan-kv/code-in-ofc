import { Router } from "express";
import { postNewUser } from "../controllers/userControllers.js";

const router = Router();

router.post("/post", postNewUser);

export default router;
