if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}



const express = require('express');
const app = express();
const path = require('path');
const { extname } = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoDBStore = require("connect-mongo")(session);

const User = require('./models/User');



const route = require('./routes');
const db = require('./config/db');



// connect to DB 
db.connect();




app.use(express.static(__dirname + '/public'));

// HANDLEBARS


app.engine('hbs', handlebars({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        sum: (a, b) => a + b,
        each_upto: function (ary, max, options) {
            if (!ary || ary.length == 0)
                return options.inverse(this);
        
            var result = [];
            for (var i = 0; i < max && i < ary.length; ++i)
                result.push(options.fn(ary[i]));
            return result.join('');
    

    }}
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(methodOverride('_method'));


app.use(bodyParser.json({
    limit: '50mb'    ///////// LIMIT for JSON
}));

app.use(bodyParser.urlencoded({
    limit: '50mb', ///////// LIMIT for URL ENCODE (image data)
    extended: true
}));



const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/hrn-web-prod';
const store = new MongoDBStore ({
    url: dbUrl,
    secret: secret,
    touchAfter: 24 * 60 * 60
})
  store.on("error", function(e){
    console.log("session store error", e)
  })
const sessionConfig = {
    store,
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}




app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


//Routes init
route(app);


//HTML PORT

// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/hrn-web-prod';

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});

