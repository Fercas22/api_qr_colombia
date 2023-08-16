const express = require('express');
const controllers = require('../controllers/sales');
const router = express.Router();

router.post('/new', controllers.newSale);

module.exports = router;