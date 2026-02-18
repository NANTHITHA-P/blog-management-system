const express = require('express');
const router = express.Router();
const {addBlog,getBlog,getMyBlog,getBlogByID,addLike,addComment,deleteMyBlog} = require('../controllers/blogController');
const authMiddleware= require('../middleware/authMiddleware');

router.post('/addblog',authMiddleware,addBlog);
router.get('/getblog',getBlog);
router.get('/getmyblog',authMiddleware,getMyBlog);
router.get('/getblog/:id',getBlogByID);
router.patch('/:blogId/addlike',authMiddleware,addLike);
router.patch('/:blogId/addcomment',authMiddleware,addComment);
router.patch('/:blogId/deletemyblog',authMiddleware,deleteMyBlog);

module.exports = router;