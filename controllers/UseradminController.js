const Useradmin = require('../models/User');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');
const bcrypt = require('bcrypt');



class UseradminController {



    // [GET] /news/:slug
    show(req, res, next) {
       Useradmin.findOne({ slug: req.params.slug })
            .then(users => {
                res.render('useradmin/show', {
                    users: mongooseToObject(users)
                });
            })
            .catch(next);


    }

    // [GET] /news/create
    create(req, res, next) {
        res.render('useradmin/create')


    }
    //  [POST] /news/store
    async store(req, res) {
        const  {password, username, email} = req.body;
        // const users = new Useradmin({password, username, email});
        const hash = await bcrypt.hash(password, 12);
        const user = new Useradmin({
            username,
            password:hash,
            email
        })
        await user.save()
        res.redirect('/admin/user-index');
        // users.save()
        //     .then(() => res.redirect('/admin/user-index'))
        //     .catch(error => {

        //     });
       
        
      
    }

    

    // [GET] /news/:id/edit
    edit(req, res, next) {
       Useradmin.findById(req.params.id)
            .then(users => res.render('useradmin/edit', {
                users: mongooseToObject(users)
            }))
            .catch(next);



    }
    // [PUT] /news/:id
    update(req, res, next) {
       Useradmin.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/user-index'))
            .catch(next);



    }
    // [DELETE] /news/:id
    delete(req, res, next) {
       Useradmin.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [DELETE] /news/:id/force
    forceDelete(req, res, next) {
       Useradmin.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [PATCH] /news/:id/restore
    restore(req, res, next) {
       Useradmin.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
               Useradmin.delete({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forcedelete':
               Useradmin.deleteOne({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
               Useradmin.restore({ _id: { $in: req.body.userIds }  })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}


module.exports = new UseradminController;


