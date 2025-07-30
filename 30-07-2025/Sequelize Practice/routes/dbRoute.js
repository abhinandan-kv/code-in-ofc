import { Router } from "express";
import { newUser, deleteUserById, getTable, updateUserById,associationEx,test } from "../controllers/dbController.js";

const router = Router()

router.post('/postuser', newUser)       

router.delete('/deleteuser/:id', deleteUserById)

router.get('/getTable', getTable)

router.patch('/updateuser/:id', updateUserById)

router.post('/as', associationEx)

router.get('/test', test)

export default router