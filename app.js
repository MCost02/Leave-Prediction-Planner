const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const brypt = require('bcrypt');
const mainRoutes = require('./routes/mainRoutes');
const User = require('./models/user');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/LPP';
app.set('view engine', 'ejs');


//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use(session({
    secret: 'vjicosjvnihjfdsnosdnio',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/LPP'})
}));

app.use((req, res, next)=>{
    console.log(req.session);
    next();
});

//connect to MongoDB
mongoose.connect(url)
    .then(() => {
        //start the server
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', mainRoutes);


//create a new user
app.post('/', (req,res,next)=>{
    let user = new User(req.body);
    user.save()
    .then(()=>res.redirect('/instructor-home'))
    .catch(err=>next(err));
});

//process login request
app.post('/login', (req, res, next)=>{
    //authenticate
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches email
    User.findOne({email: email})
    .then(user=>{
        if(user){
            //user found in the database
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id; //store user id in session
                    res.redirect('/instructor-home');
                } else {
                    res.redirect('/login');
                }
            })
        } else {
            res.redirect('/login');
        }
    })
    .catch(err=>next(err));
});

//get profile

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