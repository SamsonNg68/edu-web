const Feedback = require('../models/Feedback');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');

class FeedbacksController {

    //[GET] /notebook
    index(req, res, next) {
     
      
        var page = parseInt(req.query.page) || 1;
        var perPage = 8;
        var start = (page -1) * perPage;
        var end = page * perPage;
        Feedback.find({})
            .then(feedbacks => {

                res.render('feedbacks', {
                    feedbacks: multipleMongooseToObject(feedbacks).slice(start,end)
                });
            })
            .catch(next);
            
    }


    
}


module.exports = new FeedbacksController;


