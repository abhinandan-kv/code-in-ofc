import { Router } from "express";
import { changePasswordAfterLogin, login, signUp, verifyExample } from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = Router()

// give DOB format details in frontend or handle through date function auto...
// do mention role if you want to have role other than user
userRouter.post('/signup', signUp)

userRouter.post('/login', login)

userRouter.patch('/changepassword', changePasswordAfterLogin)

userRouter.get('/verifyx', verifyToken, verifyExample) //test route only



//admin ops
userRouter.patch('/patch/:id', verifyToken, activateAccount)


export default userRouter