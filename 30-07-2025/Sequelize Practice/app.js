import express from 'express';
import router from './routes/dbRoute.js';
import runTest from './view/test.js';

const app = express()
const port = 3000

app.use(express.json())
app.use('/db', router)

//runTest()

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
}
)