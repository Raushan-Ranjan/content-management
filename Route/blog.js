const express = require('express');
const router = express.Router();

const { giveAdminAccess,updateBlog , createBlog, isPublishBlog, getAllBlog,getBlogById,deleteBlog} = require('../controller/blog');
const {authenticateUser,authorizedUser} = require('../middleware/authentication');


router.route('/').get(authenticateUser,getAllBlog);
router.route('/createBlog').post(authenticateUser,authorizedUser('super admin','admin'),createBlog);
router.route('/adminAccess').patch(authenticateUser,authorizedUser('super admin'),giveAdminAccess);
router.route('/actions/:id').get(authenticateUser,getBlogById).delete(authenticateUser,authorizedUser('super admin'),deleteBlog).put(authenticateUser,authorizedUser('super admin','admin'),updateBlog).patch(authenticateUser,authorizedUser('super admin'),isPublishBlog)

module.exports = router;