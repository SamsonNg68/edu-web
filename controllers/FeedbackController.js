const Feedback = require('../models/Feedback');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');



class FeedbackController {



    // [GET] /institutes/:slug
    show(req, res, next) {
        Feedback.findOne({ slug: req.params.slug })
            .then(feedbacks => {
                res.render('feedbacks/show', {
                    feedbacks: mongooseToObject(feedbacks)
                });
            })
            .catch(next);

    }

    // [GET] /institutes/create
    create(req, res, next) {
        res.render('feedbacks/create')


    }

    //  [POST] /institutes/store
    store(req, res, next) {
        const formData = req.body;
        const feedback = new  Feedback(formData);
        feedback.save()
            .then(() => res.redirect('/admin/feedback-index'))
            .catch(error => {

            });

    }

    // [GET] /institutes/:id/edit
    edit(req, res, next) {
        Feedback.findById(req.params.id)
            .then(feedbacks => res.render('feedbacks/edit', {
                feedbacks: mongooseToObject(feedbacks)
            }))
            .catch(next);



    }
    // [PUT] /institutes/:id
    update(req, res, next) {
        Feedback.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/feedback-index'))
            .catch(next);



    }
    // [DELETE] /institutes/:id
    delete(req, res, next) {
        Feedback.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [DELETE] /institutes/:id/force
    forceDelete(req, res, next) {
        Feedback.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [PATCH] /institutes/:id/restore
    restore(req, res, next) {
        Feedback.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Feedback.delete({ _id: { $in: req.body.feedbackIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forcedelete':
                Feedback.deleteOne({ _id: { $in: req.body.feedbackIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Feedback.restore({ _id: { $in: req.body.feedbackIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}


module.exports = new FeedbackController;


