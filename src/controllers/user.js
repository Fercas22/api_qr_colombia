require('express')
const {notFount,successOk,internalErr} = require('../errors/errors')
const executeQuery = require('../database/executeQuery');
const controllers = {};


//NOTE - ver usuarios

controllers.getusers =  async(req,res) => {
    
    try{
    
        const results = await executeQuery("SELECT * FROM view_users");
        const newSuccessOk = {...successOk};
        newSuccessOk.data = results;
        
        const code = (results.length > 0) ? 200 : 404; 
        const response = (results.length > 0) ? newSuccessOk : notFount;
        
        res.status(code).json(response);
    
    }catch(error){

        internalErr.message = error.message
        console.error('Error al traer usuarios: ', error.message)
        res.status(500).json(internalErr)
    
    };
};


//NOTE - ver usuario

controllers.getuser = async(req,res) => {
    
    const {iduser} = req.query
    const results = await executeQuery('SELECT * FROM view_users WHERE id = ?', [iduser]);
    const user = results[0];
    const newSuccessOk = successOk;
    newSuccessOk.data = user;

    const code = (results.length > 0) ? 200 : 404;
    const response = (results.length > 0) ? newSuccessOk : notFount;
    res.status(code).json(response);

}

module.exports = controllers