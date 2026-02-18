const express = require('express');

const { registerUser, loginUser, checkLogin, logoutUser,saveBlog,getSavedBlog,unsaveBlog } = require('../controllers/userController');
const authMiddleware= require('../middleware/authMiddleware');

const router = express.Router();
 
router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/me',checkLogin);

router.get('/logout',logoutUser);

router.patch('/:blogId/saveblog',authMiddleware,saveBlog);

router.patch('/:blogId/unsaveblog',authMiddleware,unsaveBlog);

router.get('/getsavedblog',authMiddleware,getSavedBlog);

module.exports = router;