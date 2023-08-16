require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {notFount,successOk,internalErr, unauthorized} = require('../errors/errors')
const { hashingPassword, comparePassword } = require('../utils/utils');
const executeQuery = require('../database/executeQuery');
const controllers = {};

let secret = process.env.SECRET_JWT;

// NOTE - REGISTRO DE USUARIOS

controllers.register = async(req,res) => {
    
    let success = {...successOk}
    let body = req.body;
    let {password} = body

    try {
    
        const hashPassword = await hashingPassword(password);
        body.password = hashPassword;
        const result = await executeQuery('INSERT INTO users SET ?', [body]);
        console.log(result);
        res.json(success);
    
    } catch(error) {
        
        console.log('Error: ', error.message);
        notFount.message = error.message;
        res.status(404).json(notFount);
    
    };
};


// NOTE - AUTENTICACIÓN DE USUARIO

controllers.auth = async(req,res) => {

    let {email, password} = req.body;
    const results = await executeQuery(`SELECT id,email,password,rol FROM users WHERE email = '${email}'`);
    
    if(results.length == 0) return res.status(404).json(notFount);
    
    const user = results[0]
    const verifyPassword = await comparePassword(password,user.password);

    if(!verifyPassword){
        return res.status(401).json(unauthorized)
    };

    let payload = {id_user:user.id}
    const token = jwt.sign(payload,secret,{expiresIn:'90d'});

    const newSuccessOk = successOk;
    newSuccessOk.token = token;
    newSuccessOk.rol = user.rol;
    newSuccessOk.id = user.id;

    res.status(200).json(newSuccessOk);

};


//NOTE - cerrar sesión

controllers.logout = async(req,res) => {

    let {token} = req.headers;
    let query = `INSERT INTO blackListTokens SET token = "${token}"`;
    const results = await executeQuery(query);

    console.log(results);

    res.send('logout');

};

module.exports = controllers