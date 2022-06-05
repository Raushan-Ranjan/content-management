const express = require('express');
const router = express.Router();

const {loginController ,logoutController,registerController} = require('../controller/auth');

router.post('/login',loginController)
router.post('/register',registerController)
// router.post('/admin',giveAdminAccess)
router.get('/logout',logoutController)

module.exports = router;