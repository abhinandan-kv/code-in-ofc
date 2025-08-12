import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { bookTicket, cancelBooking, getAllUser, getSignIn, listAllEvents, listEventTimeSlots, postNewUser, viewBooking } from "../controllers/UserController.js";


const userRouter = Router()

userRouter.post('/post', postNewUser)

userRouter.get('/get',getSignIn)

userRouter.get('/getAllUser',verifyToken, getAllUser)

//events
userRouter.get('/gete', verifyToken, listAllEvents)

userRouter.get('/eslots/:id', verifyToken, listEventTimeSlots)

userRouter.post('/book', verifyToken, bookTicket)

userRouter.get('/viewbooking', verifyToken, viewBooking)

userRouter.patch('/cancel', verifyToken, cancelBooking)

export default userRouter