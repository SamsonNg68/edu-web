const News = require('../models/News');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');


class NewsController {

    index(req, res, next) {
        res.render('news/cloud');
    }

    upload(req, res, next) {
        req.flash('success', 'upload picture successful');
        res.redirect('back');
    }
    // [GET] /news/:slug
    show(req, res, next) {

        // News.findOne({ slug: req.params.slug }, function (err, news) {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         res.render('news/show', {
        //             news: mongooseToObject(news)
        //         });
        //     }
        // }

        News.findOne({ slug: req.params.slug })
            .then(news => {
                res.render('news/show', {
                    news: mongooseToObject(news)
                });
            })
            .catch(next);



    }



    // [GET] /news/create
    create(req, res, next) {
        res.render('news/create')


    }
    //  [POST] /news/store
    store(req, res, next) {

        const formData = req.body;
        const news = new News(formData);
        news.save()
            .then(() => res.redirect('/admin/post-index'))
            .catch(error => {

            });

    }

    // [GET] /news/:id/edit
    edit(req, res, next) {
        News.findById(req.params.id)
            .then(news => res.render('news/edit', {
                news: mongooseToObject(news)
            }))
            .catch(next);



    }
    // [PUT] /news/:id
    update(req, res, next) {
        News.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/post-index'))
            .catch(next);



    }
    // [DELETE] /news/:id
    delete(req, res, next) {
        News.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [DELETE] /news/:id/force
    forceDelete(req, res, next) {
        News.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }
    // [PATCH] /news/:id/restore
    restore(req, res, next) {
        News.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                News.delete({ _id: { $in: req.body.newsIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forcedelete':
                News.deleteOne({ _id: { $in: req.body.newsIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                News.restore({ _id: { $in: req.body.newsIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}


module.exports = new NewsController;


