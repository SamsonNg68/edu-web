const notebookRouter = require('./notebook');
const newsRouter = require('./news');
const siteRouter = require('./site');
const institutesListRouter = require('./institute-list');
const advisesListRouter = require('./advises');
const rentsListRouter = require('./rents');
const feedbacksListRouter = require('./feedbacks');
const instituteRouter = require('./institute');
const adviseRouter = require('./advise');
const rentRouter = require('./rent');
const feedbackRouter = require('./feedback');
const useradminRouter = require('./user-admin')
const userRouter = require('./user');
const adminRouter = require('./admin');
const contactRouter = require('./contact');







function route(app) {

    app.use('/contact', contactRouter);

    app.use('/institutes', instituteRouter);
    app.use('/advises', adviseRouter);
    app.use('/rents', rentRouter);
    app.use('/feedbacks', feedbackRouter);

    // Admin Manage Posts News
    app.use('/admin', adminRouter);
    // Users
    app.use('/', userRouter);    

   //user admin
   app.use('/useradmin', useradminRouter);

    // Notebook
    app.use('/notebook', notebookRouter);
    // News
    app.use('/news', newsRouter);


    app.use('/institute-list', institutesListRouter);
    app.use('/advises', advisesListRouter);
    app.use('/rents', rentsListRouter);
    app.use('/feedbacks', feedbacksListRouter);

    // about-us
    app.use('/about-us', siteRouter);

    //HOME       
    app.use('/', siteRouter);



    // app.get('/institute', (req,res) => {
    //     res.render('institute');
    // })








}

module.exports = route;
