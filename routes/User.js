const express = require('express');
const { register, login, logOut, myprofile, editProfile } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').put( isAuthenticated  ,logOut)
router.route('/profile').put( isAuthenticated  ,myprofile)
router.route('/update').put(isAuthenticated, editProfile);
module.exports = router;