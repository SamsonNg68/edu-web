const News = require('../models/News');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');



class NotebooksController {
    
    //[GET] /notebook
   
    index(req,res,next){

        var page = parseInt(req.query.page) || 1;
        var perPage = 8;
        var start = (page -1) * perPage;
        var end = page * perPage;
        // res.render('notebook');
        News.find({}) 
            .then(news => {
    
                res.render('notebook', {
                    news : multipleMongooseToObject(news).slice(start,end)
                });
            })
            .catch(next);
    }


}


module.exports = new NotebooksController;


