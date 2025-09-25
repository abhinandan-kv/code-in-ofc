import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { getNote, postNewNote } from "../controllers/noteController.js";

const noteRouter = Router();

noteRouter.post("/post", verifyToken, postNewNote);
noteRouter.get('/get', verifyToken, getNote)

export default noteRouter;
