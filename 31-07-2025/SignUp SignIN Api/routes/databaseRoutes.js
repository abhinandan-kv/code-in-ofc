import { Router } from "express";
import {
  SignIn,
  SignUp,
  nextVerifyToken,
} from "../controllers/databaseController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();

router.post("/postsignup", SignUp);
router.get("/getsignin", SignIn);

router.get("/getprofile", verifyToken, nextVerifyToken);

export default router;
