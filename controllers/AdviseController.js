const Advise = require('../models/Advise');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');



class AdviseController {



    // [GET] /institutes/:slug
    show(req, res, next) {
        Advise.findOne({ slug: req.params.slug })
            .then(advises => {
                res.render('advises/show', {
                    advises: mongooseToObject(advises)
                });
            })
            .catch(next);

    }

    // [GET] /institutes/create
    create(req, res, next) {
        res.render('advises/create')


    }

    //  [POST] /institutes/store
    store(req, res, next) {
        const formData = req.body;
        const advise = new  Advise(formData);
        advise.save()
            .then(() => res.redirect('/admin/advise-index'))
            .catch(error => {

            });

    }

    // [GET] /institutes/:id/edit
    edit(req, res, next) {
        Advise.findById(req.params.id)
            .then(advises => res.render('advises/edit', {
                advises: mongooseToObject(advises)
            }))
            .catch(next);



    }
    // [PUT] /institutes/:id
    update(req, res, next) {
        Advise.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/advise-index'))
            .catch(next);



    }
    // [DELETE] /institutes/:id
    delete(req, res, next) {
        Advise.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [DELETE] /institutes/:id/force
    forceDelete(req, res, next) {
        Advise.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [PATCH] /institutes/:id/restore
    restore(req, res, next) {
        Advise.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Advise.delete({ _id: { $in: req.body.adviseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forcedelete':
                Advise.deleteOne({ _id: { $in: req.body.adviseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Advise.restore({ _id: { $in: req.body.adviseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}


module.exports = new AdviseController;


