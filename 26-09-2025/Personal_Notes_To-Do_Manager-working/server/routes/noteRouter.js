import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { deleteNote, getNote, postNewNote } from "../controllers/noteController.js";

const noteRouter = Router();

noteRouter.post("/post", verifyToken, postNewNote);
noteRouter.get("/get", verifyToken, getNote);
noteRouter.delete("/delete/:noteid", verifyToken, deleteNote);

export default noteRouter;
