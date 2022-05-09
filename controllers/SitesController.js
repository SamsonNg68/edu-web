const News = require('../models/News');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');

class SitesController {
    
    //[GET] /
    index(req,res, next){
        News.find({})
        .then(news => {
            res.render('home', {
                news :multipleMongooseToObject(news)
            });
        })
        .catch(next);

        
    }



    //[GET] /ABOUT-US
    about(req, res,next){
        News.find({})
        .then(news => {
            res.render('about', {
                news :multipleMongooseToObject(news)
            });
        })
        .catch(next);

    }


}


module.exports = new SitesController;


