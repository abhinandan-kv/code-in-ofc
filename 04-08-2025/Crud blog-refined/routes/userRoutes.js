import { Router } from "express";
import { userSignUp,  nextVerifyToken, signupAfterSignin, signIn, deleteUser } from "../controllers/userController.js";
import { verifyToken, verifyAuthorized } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", userSignUp);
userRouter.get("/signin", signIn);

userRouter.get("/v", verifyToken, nextVerifyToken);
userRouter.post("/v/signup", verifyToken, signupAfterSignin);

userRouter.delete('/v/delete',verifyToken ,deleteUser)

export default userRouter;
