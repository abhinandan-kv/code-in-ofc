import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { Auth } from "../Controllers/authController.js";

const authRouter = Router();

authRouter.get("/verify", verifyToken, Auth);

export default authRouter;
