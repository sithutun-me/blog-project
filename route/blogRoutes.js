const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog.js');
const BlogController = require('../controller/BlogController.js');

router.get('', BlogController.index);
router.get('/create', BlogController.create);
router.post('', BlogController.store);
router.get('/:id/delete', BlogController.destroy);
router.get('/:id', BlogController.show);

module.exports = router;
