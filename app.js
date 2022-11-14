const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
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

mongoose.connect(url)
    .then(() => {
        //start the server
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

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