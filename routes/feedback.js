const express = require('express');
const router = express.Router();
const{isLoggedIn} = require('../middleware');

const feedbackController = require('../controllers/FeedbackController');





router.get('/create',isLoggedIn, feedbackController.create);
router.post('/store', feedbackController.store);
router.get('/:id/edit',isLoggedIn, feedbackController.edit);
router.post('/handle-form', feedbackController.handleFormActions);
router.put('/:id', feedbackController.update);
router.patch('/:id/restore', feedbackController.restore);
router.delete('/:id', feedbackController.delete);
router.delete('/:id/force', feedbackController.forceDelete);
router.get('/:slug',feedbackController.show);



module.exports = router;