import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { deleteBlog, postNewBlog, readBlog, recoverBlog, updateBlog } from "../controllers/blogController.js";
import { multipleImageUpload } from "../middleware/multerMiddleware.js";

const blogRouter = Router();
// multipleImageUpload
blogRouter.post("/post", verifyToken, postNewBlog);

blogRouter.get("/get", verifyToken, readBlog);

blogRouter.patch("/update", verifyToken, updateBlog);

blogRouter.delete("/delete", verifyToken, deleteBlog);

blogRouter.patch("/restore", verifyToken, recoverBlog);

export default blogRouter;
