const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {getAllBlogs} = require('../controller/blog');
const {createBlog} = require('../controller/blog');
const { auth } = require('../middleware/auth')

const storage = multer.memoryStorage();

const upload = multer({
    storage:storage
})

router
    .get('/getAllBlogs', getAllBlogs)
    .post('/createBlog', auth, upload.single('cover'),createBlog);

module.exports = { router }