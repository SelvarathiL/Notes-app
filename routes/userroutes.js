const express = require('express');
const router = express.Router();
const { signupuser,loginuser,logoutuser } = require('../controllers/usercontroller');

router.post('/signup',signupuser);
router.post('/login',loginuser);
router.post('/logout', logoutuser);

module.exports = router;