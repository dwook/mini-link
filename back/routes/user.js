const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const userController = require('../controller/user');

router.post('/', isNotLoggedIn, userController.signUp);
router.post('/check', isNotLoggedIn, userController.checkUsername);
router.post('/login', isNotLoggedIn, userController.login);
router.post('/logout', isLoggedIn, userController.logout);

module.exports = router;
