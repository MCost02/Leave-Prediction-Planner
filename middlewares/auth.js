const sigDate = require("../models/sig-date");

//check if user is a guest
exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are logged in already.');
        return res.redirect('/profile');
    }
}

//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to login first.');
        return res.redirect('/login');
    }
}

//checks if user is creator of the significant date
exports.isCreator = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid significant date id.');
        err.status = 400;
        return next(err);
    }
    sigDate.findById(id)
        .then(sigdate => {
            if (sigdate) {
                if (sigdate.instructor == req.session.user) {
                    return next();
                } else {
                    let err = new Error('You are not authorized to access this resource.');
                    err.status = 401;
                    return next(err);
                }
            } else {
                let err = new Error('Cannot find a significant date with id ' + id + '.');
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}