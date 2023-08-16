const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode');

function hashingPassword (pass) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass,10,(err,hash) => {
            if(err) reject(err);
            resolve(hash)
        });
    });
};

function comparePassword (pass,hash) {
    return new Promise((resolve,reject) => {
        bcrypt.compare(pass,hash, (err,result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};


function tokenValidExp (token,secret) {
    try{

        const decode = jwt.verify(token,secret);
        const expiration = new Date(decode.exp * 1000);
        const now = new Date();

        if(expiration > now) {
            return true;
        }else{
            return false;
        }
    
    }catch(error){
        console.log(error.message);
        return false;
    }
};


function generateQR (value) {
    return new Promise((resolve,reject) => {
        qrcode.toDataURL(value, (err,url) => {
            if(err){
                return reject(err)
            };
            resolve(url)
        })
    })
};

module.exports = {
    hashingPassword,
    comparePassword,
    tokenValidExp,
    generateQR,
};