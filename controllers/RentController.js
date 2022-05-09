const Rent = require('../models/Rent');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');



class RentController {



    // [GET] /institutes/:slug
    show(req, res, next) {
        Rent.findOne({slug: req.params.slug })
            .then(rents => {
                res.render('rents/show', {
                    rents: mongooseToObject(rents)
                });
            })
            .catch(next);

    }

    // [GET] /institutes/create
    create(req, res, next) {
        res.render('rents/create')


    }

    //  [POST] /institutes/store
    store(req, res, next) {
        const formData = req.body;
        const rent = new  Rent(formData);
        rent.save()
            .then(() => res.redirect('/admin/rent-index'))
            .catch(error => {

            });

    }

    // [GET] /institutes/:id/edit
    edit(req, res, next) {
        Rent.findById(req.params.id)
            .then(rents => res.render('rents/edit', {
                rents: mongooseToObject(rents)
            }))
            .catch(next);



    }
    // [PUT] /institutes/:id
    update(req, res, next) {
        Rent.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/rent-index'))
            .catch(next);



    }
    // [DELETE] /institutes/:id
    delete(req, res, next) {
        Rent.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [DELETE] /institutes/:id/force
    forceDelete(req, res, next) {
        Rent.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [PATCH] /institutes/:id/restore
    restore(req, res, next) {
        Rent.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
               Rent.delete({ _id: { $in: req.body.rentIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forcedelete':
               Rent.deleteOne({ _id: { $in: req.body.rentIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
               Rent.restore({ _id: { $in: req.body.rentIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}


module.exports = new RentController;


