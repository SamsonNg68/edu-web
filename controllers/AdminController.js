const News = require('../models/News');
const Institute = require('../models/Institute');
const Advise = require('../models/Advise');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const Rent = require('../models/Rent');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
const passport = require('passport');




class AdminController {
    

    

    //[GET] / post manage
    postsmanage(req, res, next){
    
        Promise.all([News.find({}), News.countDocumentsDeleted()])
            .then(([news, deletedCount]) =>
            res.render('admin/post-index', {
                deletedCount,
                news: multipleMongooseToObject(news),
                })
            )
            .catch(next); 
    
        // News.countDocumentsDeleted()
        //     .then((deleteCount) => {
        //         console.log(deleteCount)
        //     })
        //     .catch(() => {});
        

        // News.find({})
        //     .then(news => res.render('admin/post-index', {
        //         news: multipleMongooseToObject(news)
        //     }))
        //     .catch(next);
    }
    //[GET] admin/ trash/news
    trashNews(req, res,next){
        News.findDeleted({})
        .then(news => res.render('admin/trash-news', {
            news: multipleMongooseToObject(news)
        }))
        .catch(next);
        
    }


    //[GET] / institutemanage
    institutesmanage(req, res, next){
        Promise.all([Institute.find({}), Institute.countDocumentsDeleted()])
            .then(([institutes, deletedCount]) =>
            res.render('admin/institute-index', {
                deletedCount,
                institutes: multipleMongooseToObject(institutes),
                })
            )
            .catch(next); 
    

    }

      //[GET] admin/  trashInstitute
      trashInstitute(req, res,next){
        Institute.findDeleted({})
        .then(institutes => res.render('admin/trash-institute', {
            institutes: multipleMongooseToObject(institutes)
        }))
        .catch(next);
        
    }

    //[GET] / advisemanage
    advisesmanage(req, res, next){
        Promise.all([Advise.find({}), Advise.countDocumentsDeleted()])
            .then(([advises, deletedCount]) =>
            res.render('admin/advise-index', {
                deletedCount,
                advises: multipleMongooseToObject(advises),
                })
            )
            .catch(next); 
    

    }

      //[GET] admin/  trashAdvise
      trashAdvise(req, res,next){
        Advise.findDeleted({})
        .then(advises => res.render('admin/trash-advise', {
            advises: multipleMongooseToObject(advises)
        }))
        .catch(next);
        
    }
    //[GET] / advisemanage
    feedbacksmanage(req, res, next){
        Promise.all([Feedback.find({}), Feedback.countDocumentsDeleted()])
            .then(([feedbacks, deletedCount]) =>
            res.render('admin/feedback-index', {
                deletedCount,
                feedbacks: multipleMongooseToObject(feedbacks),
                })
            )
            .catch(next); 
    

    }

      //[GET] admin/  trashAdvise
      trashFeedback(req, res,next){
        Feedback.findDeleted({})
        .then(feedbacks => res.render('admin/trash-feedback', {
            feedbacks: multipleMongooseToObject(feedbacks)
        }))
        .catch(next);
        
    }
    //[GET] / advisemanage
    rentsmanage(req, res, next){
        Promise.all([Rent.find({}), Rent.countDocumentsDeleted()])
            .then(([rents, deletedCount]) =>
            res.render('admin/rent-index', {
                deletedCount,
                rents: multipleMongooseToObject(rents),
                })
            )
            .catch(next); 
    

    }

      //[GET] admin/  trashAdvise
      trashRent(req, res,next){
        Rent.findDeleted({})
        .then(rents => res.render('admin/trash-rent', {
            rents: multipleMongooseToObject(rents)
        }))
        .catch(next);
        
    }


    //[GET] / admin/usermanage
    usermanage(req, res, next){
        Promise.all([User.find({}), User.countDocumentsDeleted()])
            .then(([users, deletedCount]) =>
            res.render('admin/user-index', {
                deletedCount,
                users: multipleMongooseToObject(users),
                })
            )
            .catch(next); 
    

    }

      //[GET] admin/  trashUser
      trashUser(req, res,next){
        User.findDeleted({})
        .then(users => res.render('admin/trash-user', {
            users: multipleMongooseToObject(users)
        }))
        .catch(next);
        
    }

   




}


module.exports = new AdminController;


