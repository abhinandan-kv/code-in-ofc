import { Router } from "express";
import { createNewUser } from "../controllers/db.controllers.js";

const router = Router()

router.post('/postuser', createNewUser)

export default router;