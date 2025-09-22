import { Router } from "express";
import { postQuestion } from "../Controllers/questionController.js";
import verifyToken from "../Middleware/verifyToken.js";

const QuestionRouter = Router();

QuestionRouter.post("/post", verifyToken, postQuestion);


export default QuestionRouter