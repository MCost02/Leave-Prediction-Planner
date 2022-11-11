exports.index = (req, res) => {
    res.render('index');
}

exports.getUserLogin = (req, res, next) => {
    res.render('./user/login');
}

exports.signUp = (req, res, next) => {
    res.render('./user/signup');
}
exports.profile = (req, res, next) => {
    res.render('./user/profile');
}

exports.editProfile = (req, res, next) => {
    res.render('./user/editprofile');
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

