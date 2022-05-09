const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const ContactController = require('../controllers/ContactController');


// ContactController.index


router.get('/', ContactController.index);
router.post('/send', ContactController.send);



module.exports = router;