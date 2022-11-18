const model = require('../models/user');

exports.index = (req, res) => {
    res.render('index');
}

exports.instructorHome = (req, res, next) => {
    res.render('instructor-home');
}

exports.adminHome = (req, res, next) => {
    res.render('admin-home');
}

exports.database = (req, res, next) => {
    res.render('database');
}

exports.events = (req, res, next) => {
    res.render('events');
}

exports.getUserLogin = (req, res, next) => {
    res.render('./user/login');
}

exports.signUp = (req, res, next) => {
    res.render('./user/signup');
}

exports.editProfile = (req, res, next) => {
    res.render('./user/editprofile');
}



//user functions

exports.create = (req, res, next) => {
    let user = new model(req.body);
    user.save()
        .then(user => res.redirect('/instructor-home'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/signup');
            }

            if (err.code === 11000) {
                req.flash('error', 'Email has been used');
                return res.redirect('/signup');
            }

            next(err);
        });
};


exports.login = (req, res, next) => {
    //authenticate
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches email
    model.findOne({email: email})
    .then(user=>{
        if(user){
            //user found in the database
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id; //store user id in session
                    req.flash('success', 'You have successfully logged in');
                    if(user.isAdmin) {
                        res.redirect('/admin-home');
                    } else {
                        res.redirect('/instructor-home');
                    }
                } else {
                    req.flash('error', 'incorrect password');
                    res.redirect('/login');
                }
            })
        } else {
            req.flash('error', 'incorrect email address');
            res.redirect('/login');
        }
    })
    .catch(err=>next(err));
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    model.findById(id)
    .then(results => {
        const user = results;
        res.render('./user/profile', {user})
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });
};