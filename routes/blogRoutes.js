import express from 'express';
const router = express.Router();
import blogController from '../controllers/blogController.js';

// Blog Yayınlama Endpoint'i (POST)
router.post('/', blogController.publishBlog);

// Blog Silme Endpoint'i (DELETE)
router.delete('/:id', blogController.deleteBlog);

// Bloga Yorum Ekleme Endpoint'i (POST)
router.post('/comments', blogController.addCommentToBlog);

export default router;