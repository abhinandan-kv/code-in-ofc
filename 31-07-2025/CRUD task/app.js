import express, { Router } from "express"
import router from "./routes/user.route.js"
import productRouter from "./routes/product.routes.js"

const app = express()

const PORT = 3000

app.use(express.json())
app.use('/new', router)
app.use('/product', productRouter)

app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`)
})