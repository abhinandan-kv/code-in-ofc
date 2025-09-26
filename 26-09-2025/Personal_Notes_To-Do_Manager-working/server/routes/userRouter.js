import { Router } from "express";
import { loginIn, signUp, verify } from "../controllers/userController.js";
import verifyToken from "../Middleware/verifyToken.js";

const userRouter = Router();

userRouter.post("/signup", signUp);

userRouter.post("/login", loginIn);

userRouter.get("/verify", verifyToken, verify);

export default userRouter;
