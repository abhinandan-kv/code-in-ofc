import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { changeColor, clearAllCompletedTodo, deleteTodo, getTodo, markTodo, markTodoCompleted, postTodo } from "../controllers/todoController.js";

const todoRouter = Router();

todoRouter.post("/post", verifyToken, postTodo);
todoRouter.get("/get", verifyToken, getTodo);
todoRouter.delete("/delete/:todoId", verifyToken, deleteTodo);
todoRouter.patch("/mark/:todoId", verifyToken, markTodo);
todoRouter.put("/allcompleted", verifyToken, markTodoCompleted);
todoRouter.delete('/allcompclear',verifyToken, clearAllCompletedTodo )
todoRouter.patch('/badge/update/:todoId ', verifyToken, changeColor)

export default todoRouter;
