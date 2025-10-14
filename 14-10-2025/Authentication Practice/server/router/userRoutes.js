import { Router } from "express";
import { check, LogIn, SignUp, userDetails, verify, verifyAuth } from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = Router();

userRouter.get("/c", check);

userRouter.post('/signup', SignUp)

userRouter.post('/login', LogIn)

userRouter.get('/v', verifyToken, verify)           //test route only

userRouter.get('/verify', verifyToken, verifyAuth)

userRouter.get('/userDetails', verifyToken, userDetails)


// //msges ops <- cancelled switched to auto function calling directly from server
// userRouter.post('/msg', verifyToken, postNewMsg)

export default userRouter;
