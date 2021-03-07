const express = require('express');
const signUp = require('../controller/auth/signup');
const signIn = require('../controller/auth/signin');
const logout = require('../controller/auth/logout');
const withdraw = require('../controller/auth/withdraw');
const recovery = require('../controller/auth/recovery');
const { isLogged, isNotLogged } = require('../middleware/middleware');
const router = express.Router();

router.post('/signup', isNotLogged, signUp);
router.post('/signin', isNotLogged, signIn);
router.post('/recovery', isNotLogged, recovery);
router.delete('/withdraw', isLogged, withdraw);
router.get('/logout', isLogged, logout);

module.exports = router;
