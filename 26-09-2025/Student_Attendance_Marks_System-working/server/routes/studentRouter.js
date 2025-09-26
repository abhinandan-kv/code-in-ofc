import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { deleteStudent, getStudents } from "../controllers/studentController.js";

const studentRouter = Router();

studentRouter.get('/list', verifyToken, getStudents)
studentRouter.delete("/delete", verifyToken, deleteStudent);

export default studentRouter;
