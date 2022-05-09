const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../util/catchAsync')

const usersController = require('../controllers/UserController');



router.get('/register-view', usersController.register);
router.post('/register-view', catchAsync(usersController.submitRegister));

router.get('/login', usersController.login);
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }), usersController.submitLogin);

router.get('/logout', usersController.logout);


module.exports = router;