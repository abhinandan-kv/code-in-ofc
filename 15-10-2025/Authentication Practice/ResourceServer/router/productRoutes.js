import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { postNewProduct } from "../controllers/productController.js";

const productRoute = Router();

// verifyToken will verify the accessToken 
productRoute.post("/post", verifyToken, postNewProduct )



export default productRoute;
