import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { addSubject } from "../controllers/subjectController.js";

const SubjectRouter = Router();

SubjectRouter.post("/post", verifyToken, addSubject);

export default SubjectRouter;
