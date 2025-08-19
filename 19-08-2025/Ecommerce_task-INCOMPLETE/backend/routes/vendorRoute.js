import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { addNewProduct } from "../controllers/vendorController.js";

const vendorRouter = Router()

//do give a marker in frontend that if product category is not given the defaultvalue will be misc and others for subcategory
vendorRouter.post('/postproduct', verifyToken, addNewProduct )



export default vendorRouter