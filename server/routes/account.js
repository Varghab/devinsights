const express = require('express');
const router = express.Router();
const {signup, login, check} = require('../controller/account');
const {auth} = require('../middleware/auth.js');
const cookieParser = require('cookie-parser');

router.use(cookieParser())

router
    .post('/signup',signup)
    .post('/login',login)
    .post('/check', auth, check);

module.exports = {router}