import { Sequelize } from "sequelize";

const sequelize = new Sequelize('mydb', 'root', '',
    {
        dialect: 'mysql',
        host: 'localhost',
        port: '3306'
    }
)
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize