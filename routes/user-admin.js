const express = require('express');
const router = express.Router();
const passport = require('passport');
const{isLoggedIn} = require('../middleware');
const{isAdmin} = require('../middleware');

const useradminController = require('../controllers/UseradminController');


router.get('/:id/edit',[isLoggedIn, isAdmin], useradminController.edit);
router.post('/handle-form', useradminController.handleFormActions);
router.put('/:id', useradminController.update);
router.patch('/:id/restore', useradminController.restore);
router.delete('/:id',[isLoggedIn, isAdmin], useradminController.delete);
router.delete('/:id/force',[isLoggedIn, isAdmin], useradminController.forceDelete);
router.get('/:slug',[isLoggedIn, isAdmin], useradminController.show);







module.exports = router;