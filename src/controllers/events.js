// const { generateQR } = require('../utils/utils');
const { successOk, internalErr, notFount } = require('../errors/errors');
const executeQuery = require('../database/executeQuery');

const shortid = require('shortid');

require('express');

const controllers = {}

controllers.getEvents = async(req,res) => {

    let {id} = req.query;

    const responseOk = {...successOk};
    const query = (!id) ? `SELECT * FROM events` : `SELECT * FROM events WHERE id = "${id}"`;
    const events = await executeQuery(query);
    
    if(events.length > 0){
        let data = (!id) ? events : events[0];
        responseOk.data = data;
        return res.status(200).json(responseOk);
    }else{
        return res.status(404).json(notFount)
    }

    res.status(500).json(internalErr);

}


controllers.newEvent = async(req,res) => {

    const responseOk = {...successOk};
    const internalError = {...internalErr};
    const body = req.body;
    body.id = shortid.generate();
    internalError.message = "Error al insertar registro"

    try{
        const results = await executeQuery("INSERT INTO events SET ?", body);
        console.log(results);
        res.status(200).json(responseOk)
    }catch(error){
        console.error("Error al guardar:", error)
        internalError.message = error.message;
        res.status(500).json(internalError);
    }

}

controllers.deleteEvent = async(req,res) => {
    let {id} = req.query;
    let query = `DELETE FROM events WHERE id = "${id}"`
    try {
        const searchID = await executeQuery(`SELECT * FROM events WHERE id = "${id}"`);
        if(searchID.length > 0){
            const results = await executeQuery(query);
            res.status(200).json(successOk);
        }else{
            res.status(404).json(notFount);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(internalErr);
    }
}

controllers.updateEvent = async(req,res) => {

    let body = req.body;
    let {id} = req.query;
    let query = `UPDATE events SET ? WHERE id = "${id}"`;
    const searchID = await executeQuery(`SELECT * FROM events WHERE id = "${id}"`);
    
    if(searchID.length > 0){
        try {
            const results = await executeQuery(query, body);
            console.log(results);
            return res.status(200).json(successOk);
        } catch (error) {
            console.error("Error al actualizar",error);
            return res.status(500).json(internalErr);
        }
    }else{
        return res.status(404).json(notFount);
    }
}

module.exports = controllers