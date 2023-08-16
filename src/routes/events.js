const express = require('express');
const controllers = require('../controllers/events');
const router = express.Router();

router.get('/', controllers.getEvents);
router.post('/new', controllers.newEvent);
router.delete('/delete', controllers.deleteEvent);
router.put('/update', controllers.updateEvent);

module.exports = router;