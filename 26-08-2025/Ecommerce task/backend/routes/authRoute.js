import { Router } from "express"
import verifyToken from "../middlewares/verifyToken.js";
import { Auth } from "../controllers/authController.js";

const authRouter = Router()


//Auth checker
authRouter.get('/verify', verifyToken, Auth)


export default authRouter;