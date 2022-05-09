const User = require("../models/User");
const catchAsync = require('../util/catchAsync');



class UserController {

     //[GET] /logout
     logout(req,res){
            req.logout();
            req.flash('success', 'Hẹn gặp lại!!! ^_^');
            res.redirect('/login');
   
    }
    
    //[GET] /login
    login(req,res){
        res.render('users/login');
    }
    //[POST] /login
    submitLogin(req,res){
        req.flash('success', 'Xin chào, bạn đang ở trang quản trị du học Henry Nguyen');
        res.redirect('/admin/post-index')
    }

    //[GET] / register
    register(req, res){
        res.render('users/register-view');
    }
    //[POST] / register
    async submitRegister (req, res){
        
        try{
            // console.log(req.body.admincode);
            const {email, username, password , admincode} = req.body;
           
            const user =  new User({email, username, admincode});
            if(req.body.admincode === 'adminpermission07'){
                user.isAdmin = true;
            }
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if(err) return next(err);
                req.flash('success', 'Xin chào, bạn đang ở trang quản trị du học Henry Nguyen');
                res.redirect('/admin/post-index');

            })
          


        }catch(e){
            req.flash('error', e.message);
            res.redirect('/register-view');
        }
        
    }
    



}


module.exports = new UserController;


