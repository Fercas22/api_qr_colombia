require('express');
const jwt = require('jsonwebtoken');
const { unauthorized } = require('../errors/errors');
const { tokenValidExp } = require('../utils/utils');
const executeQuery = require('../database/executeQuery');
const middlewares = {};

let secret = process.env.SECRET_JWT;

middlewares.verifyAuth = async(req,res,next) => {
    
    let {token} = req.headers;

    if(token == undefined) return res.status(401).json(unauthorized);

    const tokenBlackList = executeQuery(`SELECT * FROM blackListTokens WHERE token = "${token}"`);

    if(tokenBlackList.length != 0) return res.status(401).json(unauthorized);

    const isExpiredToken = tokenValidExp(token,secret);

    if(!isExpiredToken){
        const newUnauthorized = unauthorized;
        newUnauthorized.message = 'token expired'
        return res.status(401).json(newUnauthorized);
    }

    next()

};


module.exports = middlewares;