const express = require('express');
const router = express.Router();

const notebooksController = require('../controllers/NotebooksController');



router.get('/', notebooksController.index);


module.exports = router;