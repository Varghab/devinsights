const express = require('express');
const router = express.Router();
const {signup, login, check, validate, avatarUpload, updateProfile, getUser} = require('../controller/account');
const {auth} = require('../middleware/auth.js');
const cookieParser = require('cookie-parser');
const multer = require('multer');

router.use(cookieParser())

const storage = multer.memoryStorage();

const upload = multer({
    storage:storage
})


router
    .post('/signup',signup)
    .post('/login',login)
    .post('/check', auth, check)
    .post('/validate',auth, validate)
    .post('/avatarUpload',upload.single('avatar'), avatarUpload)
    .put('/updateProfile', auth, updateProfile)
    .post('/getUser',auth, getUser);

module.exports = {router}