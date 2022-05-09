const express = require('express');
const router = express.Router();

const feedbacksListController = require('../controllers/FeedbacksListController');


router.get('/', feedbacksListController.index);



module.exports = router;