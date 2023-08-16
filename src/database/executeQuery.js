const pool = require('./mysql')

function executeQuery (query, params = []){
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err) console.error('error de conexion');
            connection.query(query, params, (err,results) => {
                connection.release();
                if(err) {
                    reject(err);
                }else{
                    resolve(results);
                }
            })
        })
    });
};

module.exports = executeQuery