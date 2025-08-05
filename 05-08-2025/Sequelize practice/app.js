import express from 'express'
import { Task, User } from './models.js';
import sequelize from './config/database.js';

const app = express()
const PORT=9000

const tasks = await Task.findAll({ include: User });
console.log(JSON.stringify(tasks, null, 2));


await sequelize.sync({force:true})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})