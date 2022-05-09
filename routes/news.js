const express = require('express');
const router = express.Router();
// const{isLoggedIn} = require('../middleware');


const newsController = require('../controllers/NewsController');

const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});




// router.get('/cloud', newsController.index);
// router.post('/upload',upload.array('image'), newsController.upload);






router.get('/create', newsController.create);
router.post('/store',newsController.store);
router.get('/:id/edit', newsController.edit);
router.post('/handle-form', newsController.handleFormActions);
router.put('/:id', newsController.update);
router.patch('/:id/restore', newsController.restore);
router.delete('/:id', newsController.delete);
router.delete('/:id/force', newsController.forceDelete);
router.get('/:slug', newsController.show);




module.exports = router;