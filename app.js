const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const brypt = require('bcrypt');
const mainRoutes = require('./routes/mainRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const app = express();

let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/LPP';
app.set('view engine', 'ejs');

app.use(session({
    secret: 'vjicosjvnihjfdsnosdnio',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/LPP'})
}));


//connect to MongoDB
mongoose.connect(url)
    .then(() => {
        //start the server
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));


app.use(flash());
    
app.use((req, res, next) => {
    res.locals.user = req.session.user || null
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', mainRoutes);


app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
        err.message = ('Internal Server Error');
    }
    res.status(err.status);
    res.render('error', { error: err });
});