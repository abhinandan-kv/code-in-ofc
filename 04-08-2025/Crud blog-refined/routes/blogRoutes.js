import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { adminPanel, adminPanelApproval, deleteBlog, postNewBlog, readBlog, recoverBlog, updateBlog } from "../controllers/blogController.js";
import { blogImageUpload } from "../middleware/multerUpload.js";

const blogRouter = Router();
blogRouter.post("/post", verifyToken, postNewBlog);

blogRouter.get("/get", verifyToken, readBlog);

blogRouter.patch("/update", verifyToken, updateBlog);

blogRouter.delete("/delete", verifyToken, deleteBlog);

blogRouter.patch("/restore", verifyToken, recoverBlog);

blogRouter.post("/blogs", verifyToken, blogImageUpload, postNewBlog);

blogRouter.get("/adminPanel",verifyToken, adminPanel)

blogRouter.patch("/adminPanel/:id", verifyToken, adminPanelApproval)

export default blogRouter;
