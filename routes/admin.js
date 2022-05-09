const express = require('express');
const router = express.Router();
const{isLoggedIn} = require('../middleware');
const adminController = require('../controllers/AdminController');


router.get('/trash-user', adminController.trashUser);
router.get('/user-index', adminController.usermanage);
router.get('/institute-index',isLoggedIn, adminController.institutesmanage);
router.get('/feedback-index',isLoggedIn, adminController.feedbacksmanage);
router.get('/advise-index',isLoggedIn, adminController.advisesmanage);
router.get('/rent-index',isLoggedIn, adminController.rentsmanage);
router.get('/post-index',isLoggedIn, adminController.postsmanage);
router.get('/trash-news',isLoggedIn, adminController.trashNews);
router.get('/trash-institute', adminController.trashInstitute);
router.get('/trash-advise', adminController.trashAdvise);
router.get('/trash-feedback', adminController.trashFeedback);
router.get('/trash-rent', adminController.trashRent);






module.exports = router;