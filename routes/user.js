const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/getUser/:id', userController.getUser);

module.exports = router;