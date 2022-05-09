const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/hrn-web-prod';


// Using Node.js `require()`
const mongoose = require('mongoose');


async function connect() {
    // 'mongodb://localhost:27017/hrn-web-prod'
    try{
        await mongoose.connect( dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
            });
            console.log('connect successfully!!');
    }catch(error){
        console.log('connect failue!!');
    }

}


module.exports = { connect };