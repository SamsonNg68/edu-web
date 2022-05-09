const express = require('express');
const router = express.Router();

const advisesListController = require('../controllers/AdvisesListController');


router.get('/', advisesListController.index);



module.exports = router;