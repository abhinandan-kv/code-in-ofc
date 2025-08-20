import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { addNewProduct, listAllProducts, removeProduct, updateProduct, updateProductImage } from "../controllers/vendorController.js";
import  ImageUpload  from "../middlewares/multer.js";

const vendorRouter = Router();

//do give a marker in frontend that if product category is not given the defaultvalue will be misc and others for subcategory
vendorRouter.post("/postproduct", verifyToken, ImageUpload, addNewProduct);

vendorRouter.get('/allproducts', verifyToken,listAllProducts)

vendorRouter.delete('/deleteproduct/:id', verifyToken, removeProduct)

//this route does not handle image updation, separate route will exist
vendorRouter.patch('/updateproduct/:id', verifyToken, updateProduct)

//this route handles image updation
vendorRouter.patch('/updateproductimg/:id', ImageUpload, updateProductImage)
export default vendorRouter;
