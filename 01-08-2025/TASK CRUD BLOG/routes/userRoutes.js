import { Router } from "express";
import { userSignUp, SignIn, nextVerifyToken, signupAfterSignin } from "../controllers/userController.js";
import { verifyToken, verifyAuthorized } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", userSignUp);
userRouter.get("/signin", SignIn);

userRouter.get("/v", verifyToken, nextVerifyToken);
userRouter.post("/v/signup", verifyToken, signupAfterSignin);

export default userRouter;
