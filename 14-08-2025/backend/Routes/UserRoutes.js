import { Router } from "express";
import { postNewUser, signin, verifyExample } from "../Controllers/UserController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = Router();

//localhost:9000/user/post
userRouter.post("/post", postNewUser);

//localhost:9000/user/signin
userRouter.post('/signin', signin)

//localhost:9000/user/verify
userRouter.get('/verify', verifyToken, verifyExample)

export default userRouter;
