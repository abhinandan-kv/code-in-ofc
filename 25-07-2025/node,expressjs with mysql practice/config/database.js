import mysql from 'mysql2'

let dbConfig = {
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb3'
}

let connection = mysql.createConnection(dbConfig)

try{
    connection.connect(()=>{
        console.log('Mysql database connected')

        return connection;
    })
}catch(err){
    console.error(err)
}

export default connection
