import { Router } from "express";
import {
  SignIn,
  SignUp,
  nextVerifyToken,
  listAllUsers,
  updateName,
  deleteUser,
  listAllUsersForce,
  deleteUserForce,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = Router();

router.post("/postsignup", SignUp);
router.get("/getsignin", SignIn);

router.get("/getprofile", verifyToken, nextVerifyToken);


router.get('/getallusers', listAllUsers)
router.get('/getallusersforce', listAllUsersForce)

router.post('/updateuser',verifyToken, updateName)

router.delete('/delete', verifyToken, deleteUser)
router.delete('/deleteforce', verifyToken, deleteUserForce)


// router.get('/wss', wss)


export default router;
