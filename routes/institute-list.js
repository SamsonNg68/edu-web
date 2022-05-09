const express = require('express');
const router = express.Router();

const institutesListController = require('../controllers/InstitutesListController');


router.get('/', institutesListController.index);



module.exports = router;