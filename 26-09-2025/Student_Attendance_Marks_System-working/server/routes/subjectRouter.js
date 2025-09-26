import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { addSubject, getSubject } from "../controllers/subjectController.js";

const SubjectRouter = Router();

SubjectRouter.post("/post", verifyToken, addSubject);
SubjectRouter.get("/get", verifyToken, getSubject);

export default SubjectRouter;
