const express = require('express');
const router = express.Router();
const{isLoggedIn} = require('../middleware');

const instituteController = require('../controllers/InstituteController');





router.get('/create',isLoggedIn, instituteController.create);
router.post('/store', instituteController.store);
router.get('/:id/edit',isLoggedIn, instituteController.edit);
router.post('/handle-form', instituteController.handleFormActions);
router.put('/:id', instituteController.update);
router.patch('/:id/restore', instituteController.restore);
router.delete('/:id', instituteController.delete);
router.delete('/:id/force', instituteController.forceDelete);
router.get('/:slug',instituteController.show);



module.exports = router;