const express = require('express');
const controllers = require('../controllers/user');
const router = express.Router();

router.get('/showusers', controllers.getusers)
router.get('/showuser', controllers.getuser)

module.exports = router