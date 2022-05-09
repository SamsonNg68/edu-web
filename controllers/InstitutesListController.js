const Institute = require('../models/Institute');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');

class InstitutesController {

    //[GET] /notebook
    index(req, res, next) {
        // res.render('notebook');
        var prevPage = -1;
        var nextPage = +1;
        var page = parseInt(req.query.page) || 1;
        var perPage = 8;
        var start = (page -1) * perPage;
        var end = page * perPage;
        Institute.find({})
            .then(institutes => {

                res.render('institute-list', {
                    institutes: multipleMongooseToObject(institutes).slice(start,end)
                });
            })
            .catch(next);
            
    }


    
}


module.exports = new InstitutesController;


