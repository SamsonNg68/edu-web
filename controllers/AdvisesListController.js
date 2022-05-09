const Advise = require('../models/Advise');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');

class AdvisesController {

    //[GET] /notebook
    index(req, res, next) {
     
      
        var page = parseInt(req.query.page) || 1;
        var perPage = 8;
        var start = (page -1) * perPage;
        var end = page * perPage;
        Advise.find({})
            .then(advises => {

                res.render('advises', {
                    advises: multipleMongooseToObject(advises).slice(start,end)
                });
            })
            .catch(next);
            
    }


    
}


module.exports = new AdvisesController;


