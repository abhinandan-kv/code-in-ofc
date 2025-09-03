import { Router } from "express";
import { currentIssuedBooks, getAllBooks, getFilteredBooks, issueBook, login, signup } from "../Controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = Router()

userRouter.post('/signup', signup)

userRouter.post('/login', login)

//user -> books

userRouter.get('/allbook', verifyToken, getAllBooks)

userRouter.post('/issuebook/:id', verifyToken, issueBook)

userRouter.get('/book/currentissued', verifyToken, currentIssuedBooks)

userRouter.get('/filter', verifyToken, getFilteredBooks)

export default userRouter