const {internalErr,notFount,successOk} = require('../errors/errors')
const executeQuery = require('../database/executeQuery');

const shortid = require('shortid');
require('express');

const controllers = {}

controllers.getTickets = async(req,res) => {

    let {idticket,idevent} = req.query;
    let query1 = (idticket) ? `SELECT * FROM event_tickes WHERE id_ticket = "${idticket}"` : "SELECT * FROM event_tickes";
    let query2 = `SELECT * FROM event_tickes WHERE id_event ="${idevent}"`;
    let query = (!idevent) ? query1 : query2;
    let responseOk = {...successOk};

    const results = await executeQuery(query);

    if(results.length > 0){
        responseOk.data = (idticket) ? results[0] : results;

        return res.status(200).json(responseOk);
    }else{
        return res.status(404).json(notFount);
    }

    res.status(500).json(internalErr);
}

controllers.newTicket = async(req,res) => {
    
    let body = req.body;
    let query = "INSERT INTO tickets SET ?";
    const internalError = {...internalErr};
    body.id = shortid.generate();

    try {
        const results = await executeQuery(query,body);
        console.log(results)
        res.status(200).json(successOk);
    } catch (error) {
        console.error("Error al registrar ticket: ", error.message)
        internalError.message = error.message;
        res.status(500).json(internalError);        
    }

}

controllers.deleteTicket = async(req,res) => {

    let {id} = req.query;
    let queryDel = `DELETE FROM tickets WHERE id = "${id}"`;
    let querySlc = `SELECT * FROM tickets WHERE id = "${id}"`;

    const internalError = {...internalErr};
    const tickets = await executeQuery(querySlc);

    console.log("ID: "+id)

    if(tickets.length > 0){

        try {
            const results = await executeQuery(queryDel);
            console.log(results);
            res.status(200).json(successOk);
        } catch (error) {
            console.error("Error al eliminar ticket: ", error.message);
            internalError.message = error.message;
            res.status(500).json(internalError);
        }

    }else{
        console.error("Sin registro de ID para eliminar");
        res.status(404).json(notFount);
    }

}

controllers.updateTicket = async(req,res) => {

    let internalError = {...internalErr};
    let {id} = req.query;
    let body = req.body;
    let querySlc = `SELECT * FROM tickets WHERE id = "${id}"`;
    let queryUdt = `UPDATE tickets SET ? WHERE id = "${id}"`;

    const tickets = await executeQuery(querySlc);

    if(tickets.length > 0){
        try {
            const results = await executeQuery(queryUdt, body);
            console.log(results);
            res.status(200).json(successOk);
        } catch (error) {
            internalError.message = error.message;
            console.error("Error al actualizar el ticket: ", internalError);
            res.status(500).json(internalError);
        }
    }else{
        console.error("No se encontraron registros");
        res.status(404).json(notFount);
    }

}


module.exports = controllers;