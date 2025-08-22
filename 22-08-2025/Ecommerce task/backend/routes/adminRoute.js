import { Router } from "express"
import verifyToken from "../middlewares/verifyToken.js"
import { listSingleUser,pendingRequestUsers, userCounts,listSingleProduct, activateAccount, deleteAProduct, deleteUser, forceListAllProduct, forceListAllUsers, listAllUsers, readAuditLogs } from "../controllers/adminController.js"

const adminRouter = Router()

//admin ops
adminRouter.get('/getusers', verifyToken, listAllUsers)
adminRouter.get('/getuser/:id', verifyToken, listSingleUser)

adminRouter.get('/fgetallusers', verifyToken, forceListAllUsers)
adminRouter.get('/getuser/:id', verifyToken, listSingleUser)
adminRouter.get('/pendingreq', verifyToken, pendingRequestUsers)


adminRouter.patch('/patch/:id', verifyToken, activateAccount)
adminRouter.delete('/delete/:id', verifyToken, deleteUser)

adminRouter.get('/product/fall', verifyToken, forceListAllProduct)
adminRouter.get('/product/single/:id', verifyToken, listSingleProduct)

adminRouter.delete('/product/delete/:id', verifyToken, deleteAProduct)

adminRouter.get('/audit/read', verifyToken, readAuditLogs)

adminRouter.get('/usercount', verifyToken, userCounts)

export default adminRouter