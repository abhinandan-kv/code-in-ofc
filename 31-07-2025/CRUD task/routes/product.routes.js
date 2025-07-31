import { Router } from "express";
import { listProduct, buyProduct, listProductUser } from "../controllers/product.controller.js";

const productRouter = Router()

productRouter.get('/getall', listProduct)

productRouter.post('/buy/:id', buyProduct)

productRouter.get('/list/:id', listProductUser) //yet to complete

export default productRouter