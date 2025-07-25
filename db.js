const mysql = require('mysql2/promise')

async function ConnectDB()
{
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'Selvarathi7626',
        database : 'notes'
    });
    console.log('MySQL connected!');
    return connection;
}
module.exports = ConnectDB;