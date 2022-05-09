const express = require('express');
const router = express.Router();
const{isLoggedIn} = require('../middleware');

const adviseController = require('../controllers/AdviseController');





router.get('/create',isLoggedIn, adviseController.create);
router.post('/store', adviseController.store);
router.get('/:id/edit',isLoggedIn, adviseController.edit);
router.post('/handle-form', adviseController.handleFormActions);
router.put('/:id', adviseController.update);
router.patch('/:id/restore', adviseController.restore);
router.delete('/:id', adviseController.delete);
router.delete('/:id/force', adviseController.forceDelete);
router.get('/:slug',adviseController.show);



module.exports = router;