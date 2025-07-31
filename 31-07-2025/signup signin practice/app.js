import express from 'express'
import router from './routes/db.routes.js'

const app = express()
const PORT=3000


app.use(express.json())
app.get('/db', router)

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON ${PORT}`)
})