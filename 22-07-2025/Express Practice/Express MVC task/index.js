import express from 'express'
import timer from './controllers/timer.js'
import file from './controllers/file.js'
import path from 'path'
import { fileURLToPath } from 'url';
import reponse from './models/reponse.js'
import session from 'express-session'
import cookieSession from './controllers/cookieSession.js'

const app = express()
const PORT=3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use('/timer',timer)     // timer counts 10 second from current time

app.use('/file', file)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/response', reponse)



app.use('/session', cookieSession)

app.listen(PORT,()=>{
    console.log(`Server runnning on ${PORT}`)
})