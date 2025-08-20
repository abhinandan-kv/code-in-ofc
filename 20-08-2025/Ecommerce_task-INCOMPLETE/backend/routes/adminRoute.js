import { Router } from "express"
import verifyToken from "../middlewares/verifyToken.js"
import { activateAccount, deleteUser, listAllUsers } from "../controllers/adminController.js"

const adminRouter = Router()

//admin ops
adminRouter.get('/getusers', verifyToken, listAllUsers)
adminRouter.patch('/patch/:id', verifyToken, activateAccount)
adminRouter.delete('/delete/:id', verifyToken, deleteUser)


export default adminRouter