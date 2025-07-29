import { Router } from "express";
import { sDefine } from "../controller/databaseController.js";

const router = Router()

router.post('/postTable', sDefine)

export default router