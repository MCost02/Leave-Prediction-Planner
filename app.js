const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const brypt = require('bcrypt');
const mainRoutes = require('./routes/mainRoutes');
const User = require('./models/user');

const app = express();

let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/LPP';
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));


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
app.post('/login', (req, res,next)=>{
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
                    res.redirect('/instructor-home');
                } else {
                    console.log('wrong password');
                    res.redirect('/login');
                }
            })
        } else {
            console.log('wrong email');
            res.redirect('/login');
        }
    })
    .catch(err=>next(err));
});

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