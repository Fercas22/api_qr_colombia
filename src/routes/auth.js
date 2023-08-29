const express = require('express');
const router = express.Router();
const controllers = require('../controllers/auth');
const {verifyAuth} = require('../middlewares/middlewares');

router.post('/register', controllers.register);
router.post('/login', controllers.auth);
router.post('/logout', verifyAuth,controllers.logout);
router.get('/index', controllers.index);

module.exports = router;