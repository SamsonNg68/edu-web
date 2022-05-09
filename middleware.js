
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Bạn cần phải đăng nhập!!! ^_^');
        return res.redirect('/login');
    }
    next();
}


module.exports.isAdmin = (req, res, next) => { 
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
  }