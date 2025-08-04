import express from 'express'
import router from './routes/userRoutes.js'
import sequelize from './config/database.js'
import proRouter from './routes/productRoutes.js'

const app = express()
const PORT=3000

app.use(express.json())
app.use('/user', router)
app.use('/user', proRouter)

try{
	await sequelize.sync()
}catch(err){
	console.error(err)
}

app.listen(PORT, ()=>{
	console.log(`SERVER RUNNING ON ${PORT}`);
})