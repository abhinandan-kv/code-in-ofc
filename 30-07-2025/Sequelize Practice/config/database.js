import { Sequelize } from "sequelize";

const sequelize = new Sequelize('mydb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully')
} catch (err) {
    console.error('Unable to connect to the database'.err)
}

export default sequelize;