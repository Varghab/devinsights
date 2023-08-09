const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {getAllBlogs, deleteBlog, updateBlog} = require('../controller/blog');
const {createBlog} = require('../controller/blog');
const {getSingleBlog} = require('../controller/blog');
const {getMyBlogs} = require('../controller/blog');
const { auth } = require('../middleware/auth')

const storage = multer.memoryStorage();

const upload = multer({
    storage:storage
})

router
    .get('/getAllBlogs', getAllBlogs)
    .post('/createBlog', auth, upload.single('cover'),createBlog)
    .get('/getSingleBlog/:id', getSingleBlog )
    .post('/getMyBlogs', auth,getMyBlogs )
    .delete('/deleteBlog/:id',auth, deleteBlog)
    .put('/updateBlog/:id',auth, upload.single('cover'),updateBlog)

module.exports = { router }