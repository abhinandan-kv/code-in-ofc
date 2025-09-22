import { Router } from "express";
import { loginIn, signUp, verify } from "../Controllers/authController.js";
import verifyToken from "../Middleware/verifyToken.js";

const AuthRouter = Router();

AuthRouter.post("/signup", signUp);

AuthRouter.post("/login", loginIn);

AuthRouter.get("/verify", verifyToken, verify);

export default AuthRouter;
