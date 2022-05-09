const express = require('express');
const router = express.Router();
const{isLoggedIn} = require('../middleware');

const rentController = require('../controllers/RentController');





router.get('/create',isLoggedIn, rentController.create);
router.post('/store', rentController.store);
router.get('/:id/edit',isLoggedIn, rentController.edit);
router.post('/handle-form', rentController.handleFormActions);
router.put('/:id', rentController.update);
router.patch('/:id/restore', rentController.restore);
router.delete('/:id', rentController.delete);
router.delete('/:id/force', rentController.forceDelete);
router.get('/:slug',rentController.show);



module.exports = router;