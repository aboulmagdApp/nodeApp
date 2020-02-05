const express = require('express');
//import core module to parse all incoming request
const bodyParser = require('body-parser');
// inport path to return application path for static file like css, html...etc
const path = require('path');

//create application express
const app = express();

//declare all app routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// use bodyParser for parse incoming request
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

// use all routes in app
app.use('/admin',adminRoutes);
app.use(shopRoutes);

// handel error page in app
app.use('/',(req, res, next) =>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);