const mysql = require('mysql2');
const configs = require('../configs/configs');

const connect = mysql.createPool(configs.database);

connect.getConnection((err,connect) => {
    connect.release()
    if(err) return console.error('Database error: ', err);
    console.log('success connect mysql')
})

module.exports = connect