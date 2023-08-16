const express = require('express');
const controllers = require('../controllers/tickets');
const router = express.Router();

router.get('/', controllers.getTickets);
router.post('/new', controllers.newTicket);
router.delete('/delete', controllers.deleteTicket);
router.put('/update', controllers.updateTicket);

module.exports = router;