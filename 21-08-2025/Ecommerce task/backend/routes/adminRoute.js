import { Router } from "express"
import verifyToken from "../middlewares/verifyToken.js"
import { activateAccount, deleteAProduct, deleteUser, forceListAllProduct, forceListAllUsers, listAllUsers, readAuditLogs } from "../controllers/adminController.js"

const adminRouter = Router()

//admin ops
adminRouter.get('/getusers', verifyToken, listAllUsers)
adminRouter.get('/fgetallusers', verifyToken, forceListAllUsers)
adminRouter.patch('/patch/:id', verifyToken, activateAccount)
adminRouter.delete('/delete/:id', verifyToken, deleteUser)

adminRouter.get('/product/fall', verifyToken, forceListAllProduct)

adminRouter.delete('/product/delete/:id', verifyToken, deleteAProduct)

adminRouter.get('/audit/read', verifyToken, readAuditLogs)

export default adminRouter