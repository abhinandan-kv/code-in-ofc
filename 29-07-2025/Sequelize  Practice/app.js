import express from 'express'
import router from './routes/databaseRoute.js'
import db from "./model/databaseModel.js"
import sequelize from './model/databaseModel.js'

const app = express()
const PORT = 3000

app.use(express.json())


sequelize.sync()
    .then(() => {
        console.log("Db Synced")
    })
    .catch((err) => {
        console.error("DB Error : ", err)
    })


app.use('/db', router)


app.listen(PORT, function () {
    console.log("Express is running on port" + PORT);
});


