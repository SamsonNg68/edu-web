const express = require('express');
const router = express.Router();

const rentsListController = require('../controllers/RentsListController');


router.get('/', rentsListController.index);



module.exports = router;