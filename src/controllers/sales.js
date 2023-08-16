const qrcode = require('qrcode');
const shortid = require('shortid');
const executeQuery = require('../database/executeQuery');
const {internalErr,notFount,successOk} = require('../errors/errors')
const {generateQR} = require('../utils/utils');
const controllers = {};
require('express');

controllers.newSale = async(req,res) => {

    let {idclient,idevent,idticket} = req.query;
    let id = shortid.generate();
    let qr = await generateQR(id);
    let query = "INSERT INTO sales SET ?";
    const data = {
        id: id,
        id_ticket : idticket,
        id_event : idevent,
        id_client : idclient,
        qr : qr
    };

    try {
        const results = await executeQuery(query,data);
        console.log(results);
        res.status(200).json(successOk);
    } catch (error) {
        const internalError = {...internalErr};
        internalError.message = error.message
        res.status(500).json(internalError);
    }

}

module.exports = controllers;