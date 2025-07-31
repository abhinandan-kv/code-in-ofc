import express, { Router } from "express"
import router from "./routes/databaseRoutes.js"

const app = express()

const PORT = 3000

app.use(express.json())
app.use('/new', router)


app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`)
})