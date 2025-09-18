import { Router } from "express";
import { signup } from "../Controllers/userController.js";

const userRouter = Router();

userRouter.get("/signup", signup);

export default userRouter;
