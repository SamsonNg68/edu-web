const Rent = require('../models/Rent');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');

class RentsController {

    //[GET] /notebook
    index(req, res, next) {
     
      
        var page = parseInt(req.query.page) || 1;
        var perPage = 8;
        var start = (page -1) * perPage;
        var end = page * perPage;
        Rent.find({})
            .then(rents => {

                res.render('rents', {
                    rents: multipleMongooseToObject(rents).slice(start,end)
                });
            })
            .catch(next);
            
    }


    
}


module.exports = new RentsController;


