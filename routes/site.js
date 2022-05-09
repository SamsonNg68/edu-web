const express = require('express');
const router = express.Router();

const sitesController = require('../controllers/SitesController');


// SitesController.index



router.get('/about', sitesController.about);
router.get('/', sitesController.index);


module.exports = router;