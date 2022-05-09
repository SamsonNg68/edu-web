const Institute = require('../models/Institute');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');



class InstituteController {



    // [GET] /institutes/:slug
    show(req, res, next) {
        Institute.findOne({ slug: req.params.slug })
            .then(institutes => {
                res.render('institutes/show', {
                    institutes: mongooseToObject(institutes)
                });
            })
            .catch(next);

    }

    // [GET] /institutes/create
    create(req, res, next) {
        res.render('institutes/create')


    }

    //  [POST] /institutes/store
    store(req, res, next) {
        const formData = req.body;
        const institute = new Institute(formData);
        institute.save()
            .then(() => res.redirect('/admin/institute-index'))
            .catch(error => {

            });

    }

    // [GET] /institutes/:id/edit
    edit(req, res, next) {
        Institute.findById(req.params.id)
            .then(institutes => res.render('institutes/edit', {
                institutes: mongooseToObject(institutes)
            }))
            .catch(next);



    }
    // [PUT] /institutes/:id
    update(req, res, next) {
        Institute.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/institute-index'))
            .catch(next);



    }
    // [DELETE] /institutes/:id
    delete(req, res, next) {
        Institute.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [DELETE] /institutes/:id/force
    forceDelete(req, res, next) {
        Institute.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [PATCH] /institutes/:id/restore
    restore(req, res, next) {
        Institute.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Institute.delete({ _id: { $in: req.body.instituteIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forcedelete':
                Institute.deleteOne({ _id: { $in: req.body.instituteIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Institute.restore({ _id: { $in: req.body.instituteIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}


module.exports = new InstituteController;


