const express = require('express');
const ejs = require('ejs');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
let port = 3000;
let host = 'localhost';

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', mainRoutes);
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});




app.listen(port, host, () => {
    console.log('The server is running at port', port);
});